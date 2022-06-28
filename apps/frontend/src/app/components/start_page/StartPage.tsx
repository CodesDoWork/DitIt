import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

export const StartPage = () => {
    const facts = [
        "41% of to-do items are never completed.",
        "50% of completed to-do items are done within a day.",
        "18% of completed to-do items are done within an hour.",
        "10% of completed to-do items are done within a minute.",
        "15% of “dones” started as to-do items.",
    ];

    return (
        <main>
            <h1>Welcome to DidIt</h1>
            <p>Here you can find some interesting facts about todo-lists:</p>
            <Carousel variant={"dark"}>
                {facts.map(fact => (
                    <Carousel.Item className={"p-5"}>
                        <h3 className={"w-100 text-center"}>{fact}</h3>
                    </Carousel.Item>
                ))}
            </Carousel>
            <p className={"mt-5"}>
                or directly start using DidIt <Link to={"/register"}>here</Link>.
            </p>
        </main>
    );
};
