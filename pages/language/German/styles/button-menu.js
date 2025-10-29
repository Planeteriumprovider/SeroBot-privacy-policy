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
/*    |             ACHTUNG! DIE OFFIZIELLEN RECHTE BESITZT SnaXbyte.exe UND DIE WEITERVERWENDUNG IST STRENGSTENS VERBOTEN!             |
/*    |                      ES MUSS ERST EINE OFFIZIELLE GENEHMIGUNG VON planeteriumprovider EINGWHOLT WERDEN!!!                       |
/*    |                                                                                                                                 |   
/*    |---------------------------------------------------------------------------------------------------------------------------------|
/*      |                                                                                                                             |
/*        |                          Nur @planeteriumprovider hat die Berechtigung diesen Code zu vewenden!!                        |
/*      |                                                                                                                             |
/*        |                                        EIGENTÜMER VOM CODE: @planeteriumprovider                                        |
/*      |                                                                                                                             |
/*    |---------------------------------------------------------------------------------------------------------------------------------|
/*    | ---  WEITERE INFOS AUF + WEITERE INFOS AUF + WEITERE INFOS AUF + WEITERE INFOS AUF + WEITERE INFOS AUF + WEITERE INFOS AUF  --- |
/*    |                                                                                                                                 |
/*    | Instagram :  https://www.instagram.com/                                                                                         |
/*    | Instagram :  https://www.instagram.com/                                                                                         |
/*    | Instagram :  https://www.instagram.com/                                                                                         |
/*    | Whatsapp  :  https://whatsapp.com/                                                                                              |
/*    | Whatsapp  :  https://whatsapp.com/                                                                                              |
/*    | Youtube   :  https://youtu.be/                                                                                                  |
/*    | Discord   :  https://discord.gg/                                                                                                |
/*    | Homepage  :  https://planeteriumprovider.github.io/SeroBot/                                                                     |
/*    | Email     :  planeteriumprovider@gmail.com                                                                                      |
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






















 document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  let open = false;

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      open = !open;
      menu.style.display = open ? "flex" : "none";
    });
  }

  const toggleBtn = document.getElementById('toggleLang');
  const deSection = document.getElementById('de');
  const enSection = document.getElementById('en');

  if (toggleBtn && deSection && enSection) {
    toggleBtn.addEventListener('click', () => {
      const isGerman = deSection.classList.contains('active');
      deSection.classList.toggle('active', !isGerman);
      enSection.classList.toggle('active', isGerman);
      toggleBtn.textContent = isGerman ? '🇩🇪 Deutsch' : '🇬🇧 English';
    });
  }
});

