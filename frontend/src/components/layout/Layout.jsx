import React from "react";
import Title from "../title/Title";
import Text from "../text/Text";
import Team from "../team/Team";
import Image from "../image/Image";
import Video from "../video/Video";
import Infection from "../infection/Infection";
import Times from "../times/Times";
import Map from "../map/Map";
import ImageTitle from "../imageTitle/ImageTitle";
import Quiz from "../quiz/Quiz";

// Mappatura dei componenti
const componentMap = {
	"components.title": Title,
	"components.text": Text,
	"components.team": Team,
	"components.image": Image,
	"components.video": Video,
	"components.times": Times,
	"components.map": Map,
	"components.image-title": ImageTitle,
	"components.infection": Infection, 
	"components.quiz": Quiz,
};

export default function Layout({ layout }) {
    const { size, content1, content2, content3 } = layout;

    const renderContent = (content) => {
		const infections = content.filter(elem => elem.__component === "components.infection");

        if (infections.length > 0) {
            // Passa i dati al componente Infection
            return <Infection infections={infections} />;
        }

        return content.map((elem, index) => {
            const Component = componentMap[elem.__component];
            if (Component) {
                return <Component key={index} {...elem} />;
            }
            // Fallback per componenti non trovati
            return <div key={index}>{elem.value}</div>;
        });
    };

    switch (size) {
        case "size1":
            return <div className="col-12">{renderContent(content1)}</div>;
        case "size6-6":
            return (
                <div className="d-flex flex-row flex-wrap">
                    <div className="col-12 col-sm-6">{renderContent(content1)}</div>
                    <div className="col-12 col-sm-6">{renderContent(content2)}</div>
                </div>
            );
        case "size2-10":
            return (
                <div className="row mb-3">
                    <div className="col-12 col-md-3 order-2 order-md-1 text-center mt-3 my-md-0 col-lg-3 col-xl-2">{renderContent(content1)}</div>
                    <div className="col-12 col-md-9 order-1 order-md-2 col-lg-9 col-xl-10">{renderContent(content2)}</div>
                </div>
            );
        case "size10-2":
            return (
                <div className="d-flex flex-row">
                    <div className="col-10">{renderContent(content1)}</div>
                    <div className="col-2">{renderContent(content2)}</div>
                </div>
            );
        case "size4-4-4":
            return (
                <div className="d-flex flex-column flex-md-row justify-content-center">
                    <div className="col-12 col-md-4 col-lg-4 col-xl-auto p-2 text-center">{renderContent(content1)}</div>
                    <div className="col-12 col-md-4 col-lg-4 col-xl-auto p-2 text-center">{renderContent(content2)}</div>
                    <div className="col-12 col-md-4 col-lg-4 col-xl-auto p-2 text-center">{renderContent(content3)}</div>
                </div>
            );
        default:
            return <></>;
    }
}
