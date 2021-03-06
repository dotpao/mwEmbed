<?php
/**
 * DoubleClick plugin manifest 
*/

return array (
	/** Playlist */
	'doubleClick' => array(
		'label' => 'DoubleClick',
		'description' => 'DoubleClick for Publishers (DFP) Video provides publishers with a platform 
		to increase revenue from video advertising as well as manage costs. Fully integrated with DFP,
		 publishers can now manage their entire display advertising through one platform, with video at its core.
		 Learn more about <a href="http://www.google.com/doubleclick/publishers/solutions/video.html" target="_blank">DFP video solutions</a>',
		'attributes' => array(
			'adTagUrl' => array(
				'label' => 'Ad tag URL',
				'doc' => "The DoubleClick DFP VAST ad tag URL (can include multiple nested VAST URLs). ",
				'type' => 'url'
			),
			'contentId' => array(
				'doc' => 'The contentId, used by DoubleClick plugin API, generally the entry ID, but can also be custom metadata mapping',
				'type' => 'string'
			),
			/*
			'publisherId' => array(
				'doc' => "The publisherId, used by DoubleClick plugin api",
				'type' => 'string',
			),*/
			'customParams' => array(
				'doc' => "Custom parameters passed to the DoubleClick adTag URL. Should be listed as URL parameterss key=value&key2=value2 pairs.",
				'type' => 'string'
			),
			'disableCompanionAds' => array(
				'doc' => "determine if companion ads should be disabled.",
				'type' => 'hiddenValue',
				'initvalue' => false
			),
			'cmsId' => array(
				'label' => 'CMS id',
                'doc' => "The CMS id, appended to the VAST url, used by DoubleClick plugin api",
                'type' => 'number'
            ),
            'adsManagerLoadedTimeout'=> array(
                'doc' => "Timer for timed checking if adsManager was loaded(in milliseconds)",
                'initvalue' => 5000,
                'type' => 'hiddenValue',
            )
		)
	)
);
