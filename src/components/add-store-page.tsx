"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Store,
  Upload,
  Eye,
  EyeOff,
  Mail,
  Building,
  Key,
  Shield,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Copy,
  RefreshCw,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface NewStore {
  storeId: string
  storeName: string
  storeEmail: string
  storeClientId: string
  storeClientSecret: string
  storeStatus: string
  storeImage: string
  storeDescription: string
  storeAddress: string
  storePhone: string
}

interface FormErrors {
  [key: string]: string
}

export default function StorePageAdd() {
  const [formData, setFormData] = useState<NewStore>({
    storeId: "",
    storeName: "",
    storeEmail: "",
    storeClientId: "",
    storeClientSecret: "",
    storeStatus: "active",
    storeImage: "",
    storeDescription: "",
    storeAddress: "",
    storePhone: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showClientSecret, setShowClientSecret] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const generateStoreId = () => {
    const id = Math.floor(Math.random() * 9000000000) + 1000000000
    setFormData((prev) => ({ ...prev, storeId: id.toString() }))
  }

  const generateClientCredentials = () => {
    const clientId = crypto.randomUUID()
    const clientSecret = btoa(Math.random().toString(36).substring(2) + Date.now().toString(36)).substring(0, 64)

    setFormData((prev) => ({
      ...prev,
      storeClientId: clientId,
      storeClientSecret: clientSecret,
    }))
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
    console.log(`${field} copied to clipboard`)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Store Name validation
    if (!formData.storeName.trim()) {
      newErrors.storeName = "Store name is required"
    } else if (formData.storeName.trim().length < 2) {
      newErrors.storeName = "Store name must be at least 2 characters"
    }

    // Store ID validation
    if (!formData.storeId.trim()) {
      newErrors.storeId = "Store ID is required"
    } else if (!/^\d{10,12}$/.test(formData.storeId)) {
      newErrors.storeId = "Store ID must be 10-12 digits"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.storeEmail.trim()) {
      newErrors.storeEmail = "Store email is required"
    } else if (!emailRegex.test(formData.storeEmail)) {
      newErrors.storeEmail = "Please enter a valid email address"
    }

    // Phone validation
    if (formData.storePhone && !/^\d{10,15}$/.test(formData.storePhone.replace(/\s/g, ""))) {
      newErrors.storePhone = "Please enter a valid phone number"
    }

    // Client ID validation
    if (!formData.storeClientId.trim()) {
      newErrors.storeClientId = "Client ID is required"
    }

    // Client Secret validation
    if (!formData.storeClientSecret.trim()) {
      newErrors.storeClientSecret = "Client Secret is required"
    } else if (formData.storeClientSecret.length < 32) {
      newErrors.storeClientSecret = "Client Secret must be at least 32 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof NewStore, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          storeImage: "Image size must be less than 5MB",
        }))
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          storeImage: "Please select a valid image file",
        }))
        return
      }

      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData((prev) => ({
          ...prev,
          storeImage: result,
        }))
      }
      reader.readAsDataURL(file)

      // Clear image error
      if (errors.storeImage) {
        setErrors((prev) => ({
          ...prev,
          storeImage: "",
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would typically send the data to your API
      console.log("Store data to submit:", formData)

      setSubmitStatus("success")

      // Reset form after successful submission
      setTimeout(() => {
        resetForm()
      }, 2000)
    } catch (error) {
      console.error("Error creating store:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      storeId: "",
      storeName: "",
      storeEmail: "",
      storeClientId: "",
      storeClientSecret: "",
      storeStatus: "active",
      storeImage: "",
      storeDescription: "",
      storeAddress: "",
      storePhone: "",
    })
    setErrors({})
    setImageFile(null)
    setImagePreview("")
    setSubmitStatus("idle")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Store className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Add New Store</h1>
          </div>
          <p className="text-gray-600">Create a new store with API credentials and configuration</p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === "success" && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Store created successfully! The form will reset automatically.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">Failed to create store. Please try again.</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Store Logo Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Store Logo</CardTitle>
              <CardDescription>Upload a logo for the store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={imagePreview || "/placeholder.svg"} alt="Store logo preview" />
                    <AvatarFallback className="text-lg bg-gray-100">
                      {formData.storeName ? getInitials(formData.storeName) : <Store className="h-8 w-8" />}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="store-logo-upload"
                  />
                  <label htmlFor="store-logo-upload">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 cursor-pointer"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </label>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Upload Logo</h3>
                  <p className="text-sm text-gray-600 mt-1">Choose a store logo. Max file size: 5MB</p>
                  {errors.storeImage && <p className="text-sm text-red-600 mt-1">{errors.storeImage}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Store Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Store Information
                </CardTitle>
                <CardDescription>Basic store details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storeId">
                    Store ID <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="storeId"
                      value={formData.storeId}
                      onChange={(e) => handleInputChange("storeId", e.target.value)}
                      placeholder="Enter store ID"
                      className={errors.storeId ? "border-red-500" : ""}
                    />
                    <Button type="button" variant="outline" onClick={generateStoreId}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  {errors.storeId && <p className="text-sm text-red-600">{errors.storeId}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeName">
                    Store Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="storeName"
                    value={formData.storeName}
                    onChange={(e) => handleInputChange("storeName", e.target.value)}
                    placeholder="Enter store name"
                    className={errors.storeName ? "border-red-500" : ""}
                  />
                  {errors.storeName && <p className="text-sm text-red-600">{errors.storeName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeEmail">
                    Store Email <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="storeEmail"
                      type="email"
                      value={formData.storeEmail}
                      onChange={(e) => handleInputChange("storeEmail", e.target.value)}
                      placeholder="Enter store email"
                      className={`pl-10 ${errors.storeEmail ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.storeEmail && <p className="text-sm text-red-600">{errors.storeEmail}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone Number</Label>
                  <Input
                    id="storePhone"
                    value={formData.storePhone}
                    onChange={(e) => handleInputChange("storePhone", e.target.value)}
                    placeholder="Enter phone number (optional)"
                    className={errors.storePhone ? "border-red-500" : ""}
                  />
                  {errors.storePhone && <p className="text-sm text-red-600">{errors.storePhone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeStatus">Store Status</Label>
                  <Select
                    value={formData.storeStatus}
                    onValueChange={(value) => handleInputChange("storeStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          Active
                        </div>
                      </SelectItem>
                      <SelectItem value="inactive">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                          Inactive
                        </div>
                      </SelectItem>
                      <SelectItem value="pending">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                          Pending
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* API Credentials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  API Credentials
                </CardTitle>
                <CardDescription>Client ID and Secret for API access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storeClientId">
                    Client ID <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="storeClientId"
                      value={formData.storeClientId}
                      onChange={(e) => handleInputChange("storeClientId", e.target.value)}
                      placeholder="Client ID"
                      className={errors.storeClientId ? "border-red-500" : ""}
                      readOnly
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(formData.storeClientId, "Client ID")}
                      disabled={!formData.storeClientId}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  {errors.storeClientId && <p className="text-sm text-red-600">{errors.storeClientId}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeClientSecret">
                    Client Secret <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Input
                        id="storeClientSecret"
                        type={showClientSecret ? "text" : "password"}
                        value={formData.storeClientSecret}
                        onChange={(e) => handleInputChange("storeClientSecret", e.target.value)}
                        placeholder="Client Secret"
                        className={errors.storeClientSecret ? "border-red-500" : ""}
                        readOnly
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowClientSecret(!showClientSecret)}
                      >
                        {showClientSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(formData.storeClientSecret, "Client Secret")}
                      disabled={!formData.storeClientSecret}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  {errors.storeClientSecret && <p className="text-sm text-red-600">{errors.storeClientSecret}</p>}
                </div>

                <Button type="button" variant="outline" onClick={generateClientCredentials} className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Generate API Credentials
                </Button>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Keep your Client Secret secure. It will only be shown once after generation.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Store description and address details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  value={formData.storeDescription}
                  onChange={(e) => handleInputChange("storeDescription", e.target.value)}
                  placeholder="Enter store description (optional)"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeAddress">Store Address</Label>
                <Textarea
                  id="storeAddress"
                  value={formData.storeAddress}
                  onChange={(e) => handleInputChange("storeAddress", e.target.value)}
                  placeholder="Enter store address (optional)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <Button type="button" variant="outline" onClick={resetForm} disabled={isSubmitting}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Store...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Store
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
