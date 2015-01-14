EasyIAT
=======

A more modern open source Impicit Association Test for the web.  Uses javascript and html5 for a scalable interface and more accurate timing.  Configuration files support single and multiple target IATs and arbitrary numbers of blocks, stimuli and trials.

Graham Thompson grahamwt42@gmail.com
Chanita Intawan cintawan@ucmerced.edu
Bryan Kerster bkerster@ucmerced.edu

Requirements:
-------------
Server-side: PHP, Python & write permission for web user in directory
	     
Client-side: Recent HTML5 and Javascript capable web browser (Firefox & Chrome work well, we have had bugs with Opera)

Setup: 
-------------
1) Copy unpacked directory to your server
2) Set write permissions for savefile.php and the output folder (If you do not do this data will not output)
3) Edit config files to make your experiment
4) Enjoy

Creating Your IAT:
-------------------------
Intro:
The main reason for creating this implementation of the Implicit Association Test is that other open source versions such as Winter Mason's (https://github.com/winteram/IAT) do not currently support common variants of the IAT task such as brief or single target IATs and are not easily modified to do so.  This version was built to allow the user to make any type of IAT simply by modifying the configuration files.  The config files are very powerful but require some in depth knowledge about the IAT procedure to manually set and will crash the whole program if you miss a comma.  We have provided example configuration files for standard multiple and single target IATs in the config folder.  I reccomend simply replacing the stimuli in one of these example sets with your desired stimuli and not messing with any other settings unless you know what you're doing.

