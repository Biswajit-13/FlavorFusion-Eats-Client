import React from 'react';
import rest1 from "../assets/rest1.jpg";
import rest2 from "../assets/rest2.jpg";

const About = () => {
    return (
        <section id="about" className="bg-white dark:bg-gray-900">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    🌟 Welcome to FlavorFusion Eats! 🌟
                    </h2>
                    <p className="mb-6">
                    At FlavorFusion Eats, we take pride in delivering a culinary experience that's second to none. Our commitment to quality ingredients, expert craftsmanship, and a passion for flavors ensures that every dish surpasses expectations. From the sizzling starters to the divine desserts, each bite reflects our dedication to providing you with the finest dining experience.
                    </p>
                    <p>
                    Step into our welcoming ambiance, where every visit is a celebration of good company and great food. Whether it's an intimate dinner for two or a joyous gathering of friends and family, our space is designed to bring people together, fostering connections and creating cherished moments. Join us at FlavorFusion Eats, where exceptional food and warm gatherings await. Your table is ready, and we can't wait to serve you!
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:mt-0">
                    <img
                        className="w-full h-full object-cover rounded-lg shadow-md"
                        src={rest1}
                        alt="office content 1"
                    />
                    <img
                        className="mt-4 w-full h-full object-cover rounded-lg shadow-md sm:mt-0"
                        src={rest2}
                        alt="office content 2"
                    />
                </div>
            </div>
        </section>
    );
}

export default About;
