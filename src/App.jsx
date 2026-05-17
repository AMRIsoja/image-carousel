import "./App.css";
import Carousel from "./components/Carousel";
import images from "./data/images";

function App() {
    return (
        <main className="app">
            <h1>React Image Carousel</h1>
            <Carousel
                images={images}
                autoPlay={true}
                interval={3000}
                showDots={true}
                showArrows={true}
            />
        </main>
    );
}

export default App;
