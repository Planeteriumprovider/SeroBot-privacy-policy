/* ACHTUNG HAFTUNGSAUSSCHLUSS! */

/* Copyright 2025 | planeteriumprovider

/* Licensed under the Apache License, Version 2.0 (the "License");
/* You may use this file only in accordance with the License.
/* You may obtain a copy of the License at
/* 
/* http://www.apache.org/licenses/LICENSE-2.0
/* 
/* Unless required by law or agreed to in writing,
/* Products distributed under the License are distributed on an "AS IS" basis,
/* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/* The specific language for permissions and
/* limitations under the License.
/* 
/*    |---------------------------------------------------------------------------------------------------------------------------------|
/*    |                                                                                                                                 |
/*    |             ACHTUNG! DIE OFFIZIELLEN RECHTE BESITZT XOIS UND DIE WEITERVERWENDUNG IST STRENGSTENS VERBOTEN!                     |
/*    |                        ES MUSS ERST EINE OFFIZIELLE GENEHMIGUNG VON XOIS EINGWHOLT WERDEN!!!                                    |
/*    |                                                                                                                                 |   
/*    |---------------------------------------------------------------------------------------------------------------------------------|
/*      |                                                                                                                             |
/*        |                   @planeteriumprovider hat die Berechtigung von XOIS für die Verwendung erhalten!                       |
/*      |                                                                                                                             |
/*        |                                              EIGENTÜMER VOM CODE: XOIS                                                  |
/*      |                                                                                                                             |
/*    |---------------------------------------------------------------------------------------------------------------------------------|
/*    | ---  WEITERE INFOS AUF + WEITERE INFOS AUF + WEITERE INFOS AUF + WEITERE INFOS AUF + WEITERE INFOS AUF + WEITERE INFOS AUF  --- |
/*    |                                                                                                                                 |
/*    | Instagram :  https://www.instagram.com/hakaidev?igsh=cmthM2cxYjJ5OWwy                                                           |
/*    | Instagram :  https://www.instagram.com/meepcoin?igsh=MTRtYWZuaWV5eTFlZQ==                                                       |
/*    | Instagram :  https://www.instagram.com/metha_connection?igsh=OWZsOTE5OWJibXN4                                                   |
/*    | Whatsapp  :  https://whatsapp.com/channel/0029VaCABrQ0AgWFWiCXq13W                                                              |
/*    | Whatsapp  :  https://whatsapp.com/channel/0029VaN2GYGCMY0Gr2mTFW2p                                                              |
/*    | Youtube   :  https://youtube.com/@HakaiDEVxMETHA?si=jMuzOjq8cvVdm8ed                                                            |
/*    | Discord   :  https://discord.gg/XW4gJQPf                                                                                        |
/*    | Homepage  :  https://hakaidev-x-metha.org                                                                                       |
/*    | Email     :  hakaidevxmethahelp@gmail.com                                                                                       |
/*    |                                                                                                                                 |
/*    |---------------------------------------------------------------------------------------------------------------------------------|
/* 
/* Copyright 2025  |  planeteriumprovider
/* 
/* Lizenziert unter der Apache-Lizenz, Version 2.0 (die „Lizenz“);
/* Sie dürfen diese Datei nur in Übereinstimmung mit der Lizenz verwenden.
/* Sie können eine Kopie der Lizenz erhalten unter
/* 
/* http://www.apache.org/licenses/LICENSE-2.0
/* 
/* Sofern nicht gesetzlich vorgeschrieben oder schriftlich vereinbart,
/* Die unter der Lizenz vertriebenen Produkte werden auf einer „AS IS“-Basis vertrieben,
/* OHNE GARANTIEN ODER BEDINGUNGEN JEGLICHER ART, weder ausdrücklich noch stillschweigend.
/* Die spezifischen Sprachbestimmungen für Berechtigungen und
/* Einschränkungen im Rahmen der Lizenz. */

document.addEventListener('DOMContentLoaded', () => {
    const backFromSettingsButton = document.getElementById('back-from-settings');
    const restartFromSettingsButton = document.getElementById('restart-from-settings');   
    window.updateColorMenuButtons = function() {
        if (window.calledFromGameOver) {
            restartFromSettingsButton.style.display = 'inline-block';
            backToGameButton.style.display = 'none';
        }
    } 
    backFromSettingsButton.addEventListener('click', () => {
        if (typeof window.showStartMenu === 'function') {
            window.showStartMenu();
        }
    });
});
