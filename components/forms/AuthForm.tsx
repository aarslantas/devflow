"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import router, {
  useRouter,
} from "next/navigation";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";

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
import ROUTES from "@/constants/routes";
import { toast } from "@/hooks/use-toast";
import { ActionResponse } from "@/types/global";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  // 1. Define your form.

  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:
      defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (
    data
  ) => {
    const result = (await onSubmit(
      data
    )) as ActionResponse;

    if (result.success) {
      toast({
        title: "Success",
        description:
          formType === "SIGN_IN"
            ? "Successfully signed in"
            : "Successfully signed up",
      });

      router.push(ROUTES.HOME);
    } else {
      toast({
        title: `Error ${result?.status}`,
        description: result.error?.message,
        variant: "destructive",
      });
    }

    // TODO : Authenticate User
  };

  const buttonText =
    formType === "SIGN_IN"
      ? "Sign In"
      : "Sign Up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
      >
        {Object.keys(defaultValues).map(
          (field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem className="ga-2.5 flex w-full flex-col">
                  <FormLabel className="paragragh-medium text-dark400_light700">
                    {field.name === "email"
                      ? "Email Adress"
                      : field.name
                          .charAt(0)
                          .toUpperCase() +
                        field.name.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      type={
                        field.name === "password"
                          ? "password"
                          : "text"
                      }
                      {...field}
                      className="paragraph-regular background-light-900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}

        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-2 w-full rounded-2  px-4 py-2 font-inter !text-light-900 "
          type="submit"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Sign In..."
              : "Sign Up..."
            : buttonText}
        </Button>
        {formType === "SIGN_IN" ? (
          <p>
            Don't have an account?{" "}
            <Link
              className="paragraph-semibold"
              href={ROUTES.SIGN_UP}
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              className="paragraph-semibold"
              href={ROUTES.SIGN_IN}
            >
              Sign in
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
