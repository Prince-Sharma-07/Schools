"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import schoolSchema from "@/lib/validation/schoolSchema";
import { Spinner } from "@radix-ui/themes";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRef } from "react";

export default function ProfileForm() {
  const form = useForm<z.infer<typeof schoolSchema>>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      name: "",
      email_id: "",
      address: "",
      city: "",
      state: "",
      contact: "",
    },
  });

  const fileInput = useRef<HTMLInputElement>(null);

  async function onSubmit(values: z.infer<typeof schoolSchema>) {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email_id", values.email_id);
      formData.append("address", values.address);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("contact", values.contact);
      if (values.image) {
        formData.append("image", values.image);
      }

      const res = await axios.post("/api/addSchool", formData);
      console.log(res);
      toast.success(res?.data?.message || "School Added Successfully!");
      form.reset();
      if(fileInput.current){
        fileInput.current.value = ''
      }
    } catch (err: any) {
      toast("Something went wrong!");
      console.log("Error on client while adding school", err);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8 items-center"
        >
          <h1 className="font-bold text-3xl">Add a New School</h1>
          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-gray-50 backdrop-blur-3xl p-8 rounded-2xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name</FormLabel>
                  <FormControl>
                    <Input placeholder="School Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      ref={fileInput}
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                      className="bg-gray-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {form.formState.isSubmitting ? (
            <Button className="w-20">
              <Spinner />
            </Button>
          ) : (
            <div className="w-full flex justify-between px-4 sm:justify-center gap-24">
              <Button type="submit" className="w-20">
                Submit
              </Button>
              <Link href={"/showSchools"}>
                <Button>
                  <SearchIcon />
                  Schools
                </Button>
              </Link>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
