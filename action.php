<?php

use dokuwiki\Extension\ActionPlugin;
use dokuwiki\Extension\EventHandler;
use dokuwiki\Extension\Event;


if(!defined('DOKU_INC')) die();

/**
 * DokuWiki Plugin hiresimage (Action Component)
 *
 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
 * @author Yifei Zhao <zhaoyifei5053@163.com>
 */
class action_plugin_hiresimage extends ActionPlugin{
    public function register(EventHandler $controller){
        // Pass
    }
}
