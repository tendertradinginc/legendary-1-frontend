"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImageToImgBB } from "@/utils/imageUpload";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UpdateTeamMemberForm({ memberId, setReload }) {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    designation: "",
    socialMedia: {
      facebook: "",
      linkedin: "",
      whatsapp: "",
    },
    featuredStatus: false,
  });

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/teamMember/${memberId}`
        );
        setFormData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch team member data:", error);
        toast.error("Failed to load team member data. Please try again.");
      }
    };

    if (memberId) {
      fetchMemberData();
    }
  }, [memberId]);

  const handleImageUpload = async (e) => {
    setUploading(true);
    try {
      const image = e.target.files[0];
      const imageUrl = await uploadImageToImgBB(image);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.image || !formData.designation) {
      toast.error("Please provide all required fields.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/teamMember/${memberId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Team member updated successfully!");
      setReload((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to update team member:", error.response || error);
      toast.error(
        `Failed to update team member: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-4">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="member-name">Name</Label>
          <Input
            name="member-name"
            placeholder="Enter member name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="member-image">Profile Image</Label>
          <Input
            type="file"
            accept="image/*"
            name="member-image"
            disabled={uploading}
            onChange={handleImageUpload}
          />
        </div>

        {formData.image && (
          <Image
            src={formData.image}
            alt="member-img"
            height={100}
            width={100}
            className="size-40"
          />
        )}

        <div className="space-y-2">
          <Label htmlFor="member-designation">Designation</Label>
          <Input
            name="member-designation"
            placeholder="Enter member designation"
            value={formData.designation}
            onChange={(e) =>
              setFormData({ ...formData, designation: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="facebook">Facebook</Label>
          <Input
            name="facebook"
            placeholder="Enter Facebook profile URL"
            value={formData.socialMedia.facebook}
            onChange={(e) =>
              setFormData({
                ...formData,
                socialMedia: {
                  ...formData.socialMedia,
                  facebook: e.target.value,
                },
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            name="linkedin"
            placeholder="Enter LinkedIn profile URL"
            value={formData.socialMedia.linkedin}
            onChange={(e) =>
              setFormData({
                ...formData,
                socialMedia: {
                  ...formData.socialMedia,
                  linkedin: e.target.value,
                },
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            name="whatsapp"
            placeholder="Enter WhatsApp number"
            value={formData.socialMedia.whatsapp}
            onChange={(e) =>
              setFormData({
                ...formData,
                socialMedia: {
                  ...formData.socialMedia,
                  whatsapp: e.target.value,
                },
              })
            }
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured-status"
            checked={formData.featuredStatus}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, featuredStatus: checked })
            }
          />
          <Label htmlFor="featured-status">Featured Status</Label>
        </div>

        <Button type="submit" disabled={uploading}>
          Update Team Member
        </Button>
      </div>
    </form>
  );
}
