"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Upload, Wand2 } from "lucide-react"

export default function CreatePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    childName: "",
    childAge: "",
    childGender: "",
    interests: "",
    theme: "",
    language: "en",
    characterDescription: "",
    image: null as File | null,
  })

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // TODO: Implement story generation with OpenAI
      // TODO: Implement image generation with Replicate
      // TODO: Save to Firebase
      toast({
        title: "Success",
        description: "Your story is being generated...",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create Your Story</h1>
        <p className="text-muted-foreground">
          Fill in the details to create a personalized story
        </p>
      </div>

      <Progress value={progress} className="mb-8" />

      <div className="space-y-8">
        {step === 1 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Child Details</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="childName">Child's Name</Label>
                <Input
                  id="childName"
                  value={formData.childName}
                  onChange={(e) =>
                    setFormData({ ...formData, childName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="childAge">Child's Age</Label>
                <Input
                  id="childAge"
                  type="number"
                  value={formData.childAge}
                  onChange={(e) =>
                    setFormData({ ...formData, childAge: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="childGender">Child's Gender</Label>
                <Select
                  value={formData.childGender}
                  onValueChange={(value) =>
                    setFormData({ ...formData, childGender: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boy">Boy</SelectItem>
                    <SelectItem value="girl">Girl</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Story Preferences</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="interests">Child's Interests</Label>
                <Textarea
                  id="interests"
                  placeholder="What does your child like? (e.g., dinosaurs, space, princesses)"
                  value={formData.interests}
                  onChange={(e) =>
                    setFormData({ ...formData, interests: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="theme">Story Theme</Label>
                <Select
                  value={formData.theme}
                  onValueChange={(value) =>
                    setFormData({ ...formData, theme: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="bedtime">Bedtime Story</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Story Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    setFormData({ ...formData, language: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Character Creation</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="characterDescription">Character Description</Label>
                <Textarea
                  id="characterDescription"
                  placeholder="Describe how your child looks (hair color, eye color, etc.)"
                  value={formData.characterDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, characterDescription: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Upload a Photo (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="w-full" onClick={() => {}}>
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Photo
                  </Button>
                  {formData.image && (
                    <Button
                      variant="ghost"
                      onClick={() => setFormData({ ...formData, image: null })}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                {formData.image && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {formData.image.name}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          {step < totalSteps ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading}>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Story
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}