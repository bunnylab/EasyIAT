#!/usr/bin/env python

#Copyright 2016 Graham Thompson <grahamwt42@gmail.com>
#This work is free. You can redistribute it and/or modify it under the
#terms of the Do What The Fuck You Want To Public License, Version 2,
#as published by Sam Hocevar. See the COPYING file for more details.

#custom d-score parser for single target
#run in output directory to get d-scores for all files

import numpy as np
import os

#mapped conversion function, changes string block names to integers for numpy array
def block2num(blockString):
	return int(blockString[5:])

#create file for output and write header
outputFile = open("SummaryScores.out", "w")
outputFile.write("Identifier      FileName            D-IAT1            D-IAT2\n")

#main loop of program goes over all files in directory
for fn in os.listdir('.'):
	filename = fn
	identifier = filename[:filename.find('_')]
	
	#only parse txt output files
	if os.path.isfile(fn) and fn[-4:] == ".txt":
		rtArray = np.loadtxt(open(fn,"rb"),delimiter=",",usecols=(0,5,9), converters = {0:block2num}  )
		firstIat = rtArray[ rtArray[:,0] <= 5 ,:]
		secondIat = rtArray[ rtArray[:,0] > 5 ,:]
		
		#throw out subjects where more than 10% of trials are less than 300ms		
		if ( sum(firstIat[:,2] < 300) / len(firstIat[:,1]) ) > 0.1 : 
			print fn + "   " + "over 10% < 300ms\n"
			continue
				
		#mean reaction times for relevant blocks
		avg2 = np.mean(rtArray[(firstIat[:,0] == 2), 2])
		avg3 = np.mean(rtArray[(firstIat[:,0] == 3), 2])
		avg4 = np.mean(rtArray[(firstIat[:,0] == 4), 2])
		avg5 = np.mean(rtArray[(firstIat[:,0] == 5), 2])
		
		#standard deviation over relevant blocks
		std35 = np.std(rtArray[(firstIat[:,0] == 3) | (firstIat[:,0] == 5), 2])
		std24 = np.std(rtArray[(firstIat[:,0] == 2) | (firstIat[:,0] == 4), 2])
		
		print firstIat[(firstIat[:,0] == 1), 1] 
		
		#Account for the initial randomization of category pairings when calculating 
		#the d-score, (0 value == default pairing, value > 1 == switched pairing)
		if sum(firstIat[(firstIat[:,0] == 1), 1]) < 1:
			d1 = (avg5 - avg3) / std35
			d2 = (avg4 - avg2) / std24
		if sum(firstIat[(firstIat[:,0] == 1), 1]) > 1:
			d1 = (avg3 - avg5) / std35
			d2 = (avg2 - avg4) / std24
		
		dscore1 = (d1 + d2)/2 
		
		outputFile.write(identifier + '   ' + fn + '   ' + str(dscore1) + '\n')
		
