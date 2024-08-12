'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { ny } from '~/lib/utils'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { buttonVariants } from '~/components/ui/button'

export const userAuthSchema = z.object({
   email: z.string().email(),
   password: z.string().optional(),
})
type FormData = z.infer<typeof userAuthSchema>

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
   const form = useForm<FormData>({
      resolver: zodResolver(userAuthSchema),
      defaultValues: {
         email: '',
      },
   })
   const [isLoading, setIsLoading] = React.useState<boolean>(false)
   const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)

   async function onSubmit(_data: FormData) {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))

      const signInResult = { ok: true }
      setIsLoading(false)

      if (!signInResult?.ok) {
         return toast.error('Something went wrong.', {
            description: 'Your sign in request failed. Please try again.',
         })
      }

      return toast.success('Check your email', {
         description: 'We sent you a login link. Be sure to check your spam too.',
      })
   }

   async function onSignInGithub() {
      setIsGitHubLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsGitHubLoading(false)
   }

   return (
      <div className={ny('grid gap-6', className)} {...props}>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="grid gap-4">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           
                           <FormControl>
                              <Input
                                 id="email"
                                 placeholder="name@example.com"
                                 type="email"
                                 autoCapitalize="none"
                                 autoComplete="email"
                                 autoCorrect="off"
                                 disabled={isLoading || isGitHubLoading}
                                 {...field}
                              />
                           </FormControl>
                  
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <button
                     type="submit"
                     className={ny(buttonVariants())}
                     disabled={isLoading || isGitHubLoading}
                     onClick={() => {
                        
                     }}
                  >
                     {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
                     Sign In with Email
                  </button>
               </div>
            </form>
         </Form>
         <div className="relative">
            <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
               <span className="bg-background text-muted-foreground px-2">
                  Or continue with
               </span>
            </div>
         </div>
         <button
            type="button"
            className={ny(buttonVariants({ variant: 'outline' }))}
            onClick={() => {
               onSignInGithub()
            }}
            disabled={isLoading || isGitHubLoading}
         >
            {isGitHubLoading
               ? (
                     <Loader2 className="mr-2 size-4 animate-spin" />
                  )
               : (
                     <GitHubLogoIcon className="mr-2 size-4" />
                  )}
            {' '}
            Github
         </button>
      </div>
   )
}
