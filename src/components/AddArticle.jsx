
import { useContext, useEffect, useState } from "react"
import {UserContext} from "../context/User"
import { getTopics, postArticle } from "../api"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button.jsx"
import {Input} from "@/components/ui/input.jsx" 
import { ReloadIcon } from "@radix-ui/react-icons"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.jsx"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import AlertView from "./AlertView"

  const addArticleSchema = z.object({
    title: z.string().min(5, {
      message: "Title must be at least 5 characters.",
    }),
    body: z.string().min(10, {
      message: "Body must be at least 10 characters.",
    }),
    topic: z.string().min(2, {
        message: "Please choose topic.",

    }),
    article_img_url: z.string().optional(),
  });

const AddArticle = () => {
    const form = useForm({
        resolver: zodResolver(addArticleSchema),
        defaultValues: {
            title: "", 
            body: "", 
            topic: "", 
            article_img_url: ""
        },
    })

    const {user} = useContext(UserContext)
    const [error, setError] = useState(false)
    const [loadingPost, setLoadingPost] = useState(false)
    const [topics, setTopics] = useState(null)
     
    const navigate = useNavigate()

    useEffect(() => {
        getTopics().then(topicsFromApi => {
            setTopics(topicsFromApi)
        })
        const newArticleFromLocalStorage = JSON.parse(localStorage.getItem('new_article'))
        if(newArticleFromLocalStorage) {
            for (let key in newArticleFromLocalStorage) {
                form.setValue(key, newArticleFromLocalStorage[key])
            }
            localStorage.removeItem("new_article")
        }
    }, [])
    


    function onSubmit(values) {
      const image_url = values.article_img_url.length !== 0 ? values.article_img_url : null;

      const articleToBeSendToAPI = {...values, author: user.username, article_img_url: image_url }

      setLoadingPost(true)
      postArticle(articleToBeSendToAPI)
        .then((articleFromAPI) => { 
            navigate(`/articles/${articleFromAPI.article_id}`)
        })
        .catch(() => {
            setLoadingPost(false)
            setError(true)
        })
    }

    const handleReload = () => {
       localStorage.setItem('new_article', JSON.stringify(form.getValues()))
       window.location.reload(false);
    }

    return (
        <section className="big-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Article title" {...field} />
                  </FormControl>
                  <FormDescription/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article body</FormLabel>
                  <FormControl>
                    <Input placeholder="Type your artice here..." {...field} />
                  </FormControl>
                  <FormDescription/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="article_img_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Image URL" {...field} />
                  </FormControl>
                  <FormDescription/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel >Topic</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic"/>
                      </SelectTrigger>
                    </FormControl>
                    <FormDescription/>
                    <SelectContent>
                        {topics?.map(topic => {
                            return <SelectItem  key={topic.slug} value={topic.slug}>{topic.slug}</SelectItem>
                        })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{loadingPost ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : 'Submit'}</Button> 
            <Button type="reset" variant="secondary" className="m-3" onClick={() => {form.reset()}}>Reset</Button>
            </form>
            {error && 
                <div className="flex justify-center">
                    <AlertView handleReload={handleReload}/>
                </div>
            } 
        </Form>
       

    </section>
    )
}
        
export default AddArticle
