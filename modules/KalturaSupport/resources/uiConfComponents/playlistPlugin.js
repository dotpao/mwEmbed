/**
 * Adds uiConf based playlist support
 *
 * @dependencies
 * 		"mw.EmbedPlayer", "mw.Playlist",
 * 		'mw.PlaylistHandlerKaltura',
		'mw.PlaylistHandlerKalturaRss',
		'mw.KLayout'
 */
( function( mw, $ ) { "use strict";

// Setup the Playlist source handler binding:
$( mw ).bind( "PlaylistGetSourceHandler", function( event, playlist ){
	var $playlistTarget = $( '#' + playlist.id );
	var embedPlayer = playlist.embedPlayer;
	var kplUrl0, kpl0Id, playlistConfig;

	// Check if we are dealing with a kaltura player:
	if( !embedPlayer  ){
		mw.log("Error: playlist source handler without embedPlayer");
	} else {
		playlistConfig = {
			'uiconf_id' : embedPlayer.kuiconfid,
			'widget_id' : embedPlayer.kwidgetid
		};
		kplUrl0 = embedPlayer.getKalturaConfig( 'playlistAPI', 'kpl0Url' );
		if( kplUrl0 ) {
			kplUrl0 = decodeURIComponent( kplUrl0 );
		}

		kpl0Id = embedPlayer.getKalturaConfig( 'playlistAPI', 'kpl0Id' );
	}
	// No kpl0Url, not a kaltura playlist
	if( !kplUrl0 && !kpl0Id ){
		return ;
	}

	// get first item key in kalturaPlaylistData
	var playlistId;
	if( embedPlayer.kalturaPlaylistData ) {
		for (playlistId in embedPlayer.kalturaPlaylistData) break;
	}

	var plId = kpl0Id || new mw.Uri ( kplUrl0 ).query['playlist_id'];
	// If the url has a partner_id and executeplaylist in its url assume its a "kaltura services playlist"
	if( (embedPlayer.kalturaPlaylistData ) || 
		plId || kplUrl0.indexOf('executeplaylist') != -1 ){
		playlistConfig.playlist_id = plId;
		playlist.sourceHandler = new mw.PlaylistHandlerKaltura( playlist, playlistConfig );
		return ;
	}

	mw.log("Error playlist source not found");
});

// Check for kaltura playlist:
mw.addKalturaConfCheck(function( embedPlayer, callback ) {
	// Special iframe playlist target:
	var $playerInterface = embedPlayer.getInterface();
	
	// Check if playlist is enabled and that its not already built for this player:
	if( embedPlayer.isPluginEnabled( 'playlistAPI' )
			&&
			// check for kpl0Url or kpl0Id, don't init empty playlist
			(
					embedPlayer.getKalturaConfig( 'playlistAPI', 'kpl0Url' )
					||
					embedPlayer.getKalturaConfig( 'playlistAPI', 'kpl0Id' )
			)
			&&
		// check for activatedPlaylist
		!$( '.playlistInterface' ).hasClass( 'activatedPlaylist' )
	){
		var $uiConf = embedPlayer.$uiConf;
		var layout;
		// Check ui-conf for horizontal or vertical playlist
		// we know if the playlist is vertical or horizontal based on the parent element of the #playlist
		// vbox - vertical | hbox - horizontal
		if( $uiConf.find('#playlistHolder').length ){
			layout = ( parseInt( $uiConf.find('#playlistHolder').attr('width') ) != 100 ) ?
						'horizontal' :
						'vertical';
		} else {
			mw.log("Error:: could not determine playlist layout type ( use target size ) ");
			layout = ( $playerInterface.width() < $playerInterface.height() )
				? 'vertical' : 'horizontal';
		}

		// Add layout to container class
		if( ! embedPlayer.isPluginEnabled( 'related' ) ) {
			$playerInterface.addClass( layout );
		}
		var $playlistInterface = $playerInterface.parent( '.playlistInterface');
		if( !$playlistInterface.length ){
			$playlistInterface = $playerInterface.wrap(
					$( '<div />' )
						.addClass('playlistInterface')
						.css({
							'position': 'relative',
							'width': '100%',
							'height': '100%'
						})
				).parent();
		}
		$playlistInterface
		.addClass('activatedPlaylist')
		.playlist({
			'layout': layout,
			'embedPlayer' : embedPlayer
		})
		// add the playlist activated tag:
		callback();
	} else {
		// if playlist is not enabled continue player build out
		callback();
	}
});

})( window.mw, jQuery );