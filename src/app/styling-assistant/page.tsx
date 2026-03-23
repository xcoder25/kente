'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Loader2, Sparkles, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AiStylingAssistantOutput } from '@/ai/flows/ai-styling-assistant';
import { getStylingAdvice } from './actions';

const formSchema = z.object({
  kentePatternDescription: z.string().min(10, 'Please provide a detailed description.'),
  personalStyle: z.string().optional(),
  occasion: z.string().optional(),
});

function StylingAssistant() {
  const searchParams = useSearchParams();
  const initialPattern = searchParams.get('pattern') || '';
  const productName = searchParams.get('productName');

  const [result, setResult] = useState<AiStylingAssistantOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kentePatternDescription: initialPattern,
      personalStyle: '',
      occasion: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const response = await getStylingAdvice(values);

    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.error);
    }
    setIsLoading(false);
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <Wand2 className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl md:text-5xl font-headline">AI Styling Assistant</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Get personalized outfit ideas for your Kentekrown pieces.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              <Bot /> Your Style Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            {productName && <p className="mb-4">Getting advice for: <span className="font-bold text-primary">{productName}</span></p>}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="kentePatternDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kente Pattern Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the colors, motifs, and feel of the Kente pattern..."
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="personalStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personal Style (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="e.g., Casual, Formal..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="streetwear">Streetwear</SelectItem>
                            <SelectItem value="formal">Formal</SelectItem>
                            <SelectItem value="boho">Boho Chic</SelectItem>
                            <SelectItem value="minimalist">Minimalist</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="occasion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occasion (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="e.g., Weekend, Event..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="weekend outing">Weekend Outing</SelectItem>
                            <SelectItem value="special event">Special Event</SelectItem>
                            <SelectItem value="work">Work</SelectItem>
                            <SelectItem value="date night">Date Night</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Get Styling Advice'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-lg">Our AI stylist is crafting your look...</p>
            </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {result && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Sparkles className="text-primary" /> Outfit Combinations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    {result.outfitCombinations.map((combo, i) => (
                      <li key={i}>{combo}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Wand2 className="text-primary" /> Styling Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    {result.stylingTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StylingAssistantPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StylingAssistant />
        </Suspense>
    )
}
