EasyIAT
=======
A more modern open source Impicit Association Test for the web.  Uses javascript and html5 for a scalable interface and more accurate timing.  Configuration files support single and multiple target IATs and arbitrary numbers of blocks, stimuli and trials.

Graham grahamwt42 [@] gmail.com

Chanita cintawan [@] ucmerced.edu

Requirements:
-------------
Server-side: PHP, Python & write permission for web user in directory
	     
Client-side: Recent HTML5 and Javascript capable web browser (Firefox & Chrome work, Opera & Safari are buggy)

Simple Setup: 
-------------
1) Copy unpacked directory to your server

2) Set write permissions for savefile.php and the output folder (If you do not do this data will not output)

3) Edit localserverpath in /config/iat_config.cfg to be your url for the IAT directory (If you do not do this data will not output)  

4) Edit config files to make your experiment

4) Enjoy

Introduction:
-------------------------
The main reason for creating this Implicit Association Test is that other open source versions such as Winter Mason's also excellent implementation (https://github.com/winteram/IAT) do not currently support common variants of the IAT task such as brief or single target IATs and are not easily modified to do so.  This version was built to allow the user to make any type of IAT simply by modifying the configuration files.  The config files are very powerful but require some in depth knowledge about the IAT procedure to manually set and will crash the whole program if you miss a comma.  Template config files for some common IAT variants are provided in the config folder.  

Refer to the manual in the doc folder for information on the config files and instructions on configuring new IAT's. Project is not being actively maintained.
