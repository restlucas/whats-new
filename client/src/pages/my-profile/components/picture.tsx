import { CameraPlus } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ProfileFormProps } from "..";

interface PictureProps {
  picture: File | null;
  setFormProfile: React.Dispatch<React.SetStateAction<ProfileFormProps>>;
}

export function Picture({ picture, setFormProfile }: PictureProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormProfile((prevState) => ({
        ...prevState,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;

        setImagePreview(preview);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    if (picture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result as string;

        setImagePreview(preview);
      };
      reader.readAsDataURL(picture);
    } else {
      setImagePreview(null);
    }
  }, [picture]);

  return (
    <>
      <input
        id="picture"
        name="picture"
        type="file"
        onChange={handleChange}
        hidden
      />
      <label
        htmlFor="picture"
        className="w-36 h-36 rounded-full bg-foreground flex items-center justify-center cursor-pointer relative overflow-hidden group border border-tertiary/20 dark:border-tertiary"
      >
        {imagePreview ? (
          <>
            <div className="bg-tertiary/20 dark:bg-tertiary/80 h-full w-full z-50 hidden absolute duration-200 group-hover:flex">
              <div className="w-full h-full flex items-center justify-center bg-foreground-light/90">
                <CameraPlus size={24} className="fill-white" weight="bold" />
              </div>
            </div>
            <img
              src={imagePreview}
              alt="Picture"
              className="w-full h-full object-cover rounded-md z-30"
            />
          </>
        ) : (
          <CameraPlus size={24} className="fill-white/35" />
        )}
      </label>
    </>
  );
}
