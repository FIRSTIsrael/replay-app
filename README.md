# Replay video shooting instructor
This application is meant to be a shooting instructor for the FLL Replay remote competations in Israel.

## Structure
The application is built out of five screens:
* A welcome screen
* A QR login screen
* A transition screen before starting the shooting meant for the team to see their login details and make sure they are all correct.
* An instructions screen which guides the team through shooting their video
* A thank you screen, in which the team can close the app or shoot another video.

## The stages of the shooting
Each video is built from the following stages:
* Introduction
* Inspection
* Field run 1
* Running the match
* Field run 2

## Team data and formatting

The team data is to be passed to the app using a QR code containing a JSON in the following format:
'''json
{
	team: {
	 	number: 2212,
	 	name: 'The spikes',
	 	organization: 'Lod High school for Arts and Sciences',
	 	city: 'Lod'
	},
	upload-url: 'http://some-upload.url/video/upload'
}
'''

You can find an example QR from the team Spikes 2212 in the docs folder.
