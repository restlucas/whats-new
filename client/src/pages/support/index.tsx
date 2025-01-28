import { ArrowLeft } from "@phosphor-icons/react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "./components/form";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How can I access the news?",
    answer:
      "To access the news, simply visit the homepage of the system. There, you will find the most recent news organized by categories. Click on the title of any news to read the full content.",
  },
  {
    question: "Can I filter the news by category?",
    answer:
      "Yes! The system allows you to filter news by different categories. On the sidebar or menu, you will find options like 'Technology', 'Health', 'Politics', and more, to easily navigate between topics of interest.",
  },
  {
    question: "Does the system provide news from different sources?",
    answer:
      "Currently, the system displays news from a single source (the API you are using), but it is designed to be easily expandable. Future implementations may include multiple news sources.",
  },
  {
    question:
      "What should I do if a news article fails to load or displays an error?",
    answer:
      "If you encounter an error when loading a news article, try refreshing the page. If the issue persists, please reach out to technical support through our 'Support and Feedback' page.",
  },
  {
    question: "Can I comment on news articles?",
    answer:
      "Yes! The system allows users to comment on news articles. You can also like comments made by other users. Both features are available to interact with the content and other users. Stay tuned for more features coming soon!",
  },
  {
    question: "How can I suggest improvements or provide feedback?",
    answer:
      "I would love to hear your feedback! If you have suggestions or encountered any issues, go to our 'Support and Feedback' section and fill out the contact form. Your input is crucial for improving the system!",
  },
  {
    question: "Can I access the system on mobile devices?",
    answer:
      "Yes! The system is fully responsive, meaning you can easily access it on any device, whether desktop, tablet, or smartphone.",
  },
  {
    question: "How can I access the system?",
    answer:
      "You can access the system with two types of profiles: 'Reader' and 'Creator'. With a 'Reader' profile, you can like, comment, and like comments on news articles. On the other hand, with a 'Creator' profile, you have additional privileges, such as managing teams, creating and editing news articles, and accessing statistics like the total number of articles published, views, and likes. Choose the profile that best fits your needs and enjoy the system's features!",
  },
];

export function Support() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet title="Support and FAQ" />
      <section className="w-full h-auto py-12 flex items-center justify-center overflow-x-hidden">
        <div className="mx-6 w-full xl:w-1/2 flex flex-col items-center justify-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-start gap-2 group"
          >
            <ArrowLeft size={22} className="duration-200 dark:fill-light" />
            <span className="font-bold duration-200 group-hover:underline drop-shadow-lg dark:text-light">
              Get back
            </span>
          </button>
          <div className="w-full rounded-md border border-tertiary/20 dark:border-tertiary h-auto p-8 shadow-md space-y-6 dark:text-light">
            <h1 className="font-bold text-4xl text-red-vibrant">
              Support and FAQ
            </h1>

            <div className="w-full flex flex-col gap-5">
              <h3 className="text-2xl font-semibold">About the project</h3>
              <p className="text-sm">
                The news system was developed with the goal of providing a
                simple and intuitive platform for displaying and managing
                journalistic content. Through this application, users can access
                recent news, view full details of each article, and easily
                navigate through different categories and topics.
              </p>
              <p className="text-sm">
                This project aims to showcase my skills in front-end development
                with React, API integration, and best UX/UI practices, while
                also presenting a practical and functional solution for online
                news consumption.
              </p>
            </div>

            <div className="w-full flex flex-col gap-5">
              <h3 className="text-2xl font-semibold">
                Frequently asked questions
              </h3>

              <div className="space-y-4">
                {faqData.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-tertiary/20 dark:border-tertiary pb-4"
                  >
                    <button
                      className="w-full text-left font-medium duration-200 hover:text-red-vibrant"
                      onClick={() => toggleAnswer(index)}
                    >
                      {item.question}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-400 ease-in-out ${
                        openIndex === index ? "max-h-[1000px]" : "max-h-0"
                      }`}
                    >
                      <p className="mt-2 text-sm">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Form />
          </div>
        </div>
      </section>
    </>
  );
}
