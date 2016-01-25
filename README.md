# swagmusic.js
**swagmusic.js** is a web application that animates a man who dances to the beat of any song. It was inspired after we saw a couple of sample music visualizers on Youtube. We felt that there were no soul nor heart in the music visualizers we came across, so we decided to create our own.

The rendering and graphics are based on three.js, a Javascript library designed to make WebGL simpler. We used humanistic intelligence to ascertain the ranges of joints and limbs during certain movements and then created a list of simple dance moves. Usually the frequency and amplitude of the music, the application generates a list of moves that seamlessly combine into beautiful dancing. The dancing is done using our own custom rigid body physics engine. The model we used comprises of simple geometric objects and Wavefront OBJ files, so personalized models can be easily imported.

The songs are loaded using Soundcloud’s API and they are processed using the Web Audio API. A Fast Fourier transforms allows to obtain the frequency and amplitude data at each point which we feed into our program. To complement our program, we also implemented a simple graphic music visualizer so that you have something to compare the dancer to. The updating graph is built with chart.js.

We also integrated Twilio so that users can easily import a song into the current playlist by texting or by importing it directly from the browser.

As for future plans, we want to improve the scalability and functionality of the web application, such as integrating other sound-sharing platforms and improving on the personalization of the visualizer.
	

