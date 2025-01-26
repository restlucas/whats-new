import { SubmitButton } from "@src/components/button/submit";
import { Input } from "@src/components/input";
import { sendMessage } from "@src/services/contactServices";
import { useState } from "react";

export function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await sendMessage(formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (response) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      setError("Failed to send the message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Contact form</h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
      >
        <Input
          label="Name"
          id="name"
          name="name"
          value={formData.name}
          handleChange={handleChange}
          required
        />
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          handleChange={handleChange}
          required
        />

        <div className="col-span-full">
          <Input
            label="Subject"
            id="subject"
            name="subject"
            value={formData.subject}
            handleChange={handleChange}
            required
          />
        </div>

        <div className="col-span-full flex flex-col gap-1">
          <label htmlFor="message" className="font-semibold dark:text-white">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            className="w-full h-auto rounded-md resize-none p-2 dark:bg-[#3c4856] border border-tertiary/20 dark:border-slate-600 shadow-sm"
            onChange={handleChange}
            rows={8}
            required
          />
        </div>

        <div className="col-span-full flex items-center justify-end">
          <SubmitButton loading={loading} text="Send message" />
        </div>
      </form>

      {success && (
        <p className="text-green-500 text-center mb-4">
          Message sent successfully!
        </p>
      )}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    </div>
  );
}
