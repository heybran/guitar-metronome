# Guitar Metronome

A simple online guitar metronome app built with vanilla [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) and [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). The app allows you to set the tempo (in beats per minute) and the time signatures, and provides an audible click track to help you keep time while practicing.

## Demo

You can try out the app live at [https://guitar-metronome.netlify.app](https://guitar-metronome.netlify.app).

## Installation

To install the app locally, follow these steps:

1. Clone the repository: `git clone https://github.com/heybran/guitar-metronome.git`
2. Install the dependencies: `npm install` or `pnpm install`
3. Start the development server: `npm run dev` or `pnpm run dev`
4. Open the app in your browser at [http://localhost:5173](http://localhost:5173)

## Usage

To use the app, follow these steps:

1. Set the tempo using `-` / `+` button or the slider (`slider not implemented yet`).
2. Set the time signature by clicking the signture buttons.
3. Click the "Start" button to start the metronome.
4. Click the "Stop" button to stop the metronome.

The app will play an audible click track at the specified tempo and time signature, with an accent on the first beat of each measure.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the [GitHub repository](https://github.com/your-username/guitar-metronome/issues).

If you would like to contribute code, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b my-feature-branch`
3. Make your changes and commit them: `git commit -am 'Add some feature'`
4. Push your changes to your fork: `git push origin my-feature-branch`
5. Create a pull request on the [GitHub repository](https://github.com/your-username/guitar-metronome/pulls).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
