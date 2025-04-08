import React, { useEffect, useState } from "react";

const TagsInputField = ({ register, errors, reset }) => {
  const [tag, setTag] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [emptyTagError, setEmptyTagError] = useState(false);

  useEffect(() => {
    register("tags", {
      required: "Tag is required",
      validate: (value) => {
        if (value.length < 0) return "Minimum one tag is required";
      },
    });
  }, []);

  useEffect(() => {
    reset({
      tags: tagsList,
    });
  }, [tagsList.length]);

  const addTagToTaglist = (e) => {
    if (e.key === "Enter" && !tag) {
      setEmptyTagError(true)
    } else if (e.key === "Enter" && tag) {
      tagsList.push(tag);
      setTag("");
    }
  };

  return (
    <label className="relative w-full text-richblack-5">
      <p className="text-[0.875rem] mb-1 leading-[1.375rem]">
        Tags<sup className="text-pink-200">*</sup>
      </p>
      <input
        type="text"
        placeholder="Please press 'Enter' after adding each tag!"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyDown={(e) => addTagToTaglist(e)}
        className="bg-richblack-700 rounded-[0.5rem] w-full p-[12px] border-b border-richblack-500"
      />
      {errors.tags && (
        <p className="text-pink-200 text-sm mt-1">{errors.tags.message}</p>
      )}
      {emptyTagError && (
        <p className="text-pink-200 text-sm mt-1">
          Please enter a tag to add tag
        </p>
      )}
    </label>
  );
};

export default TagsInputField;
