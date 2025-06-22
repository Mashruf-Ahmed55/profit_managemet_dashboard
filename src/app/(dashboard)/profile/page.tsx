'use client';

import type React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  Edit,
  Eye,
  EyeOff,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  Upload,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  role: string;
  status: string;
  profileImage: string;
}

export default function Component() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    phone: '0123456789',
    address: '123 Main Street',
    role: 'admin',
    status: 'active',
    profileImage:
      'https://res.cloudinary.com/daaj6x4h2/image/upload/v1747548763/user_profile_images/qrdtjlanshpmyphpaacy.webp',
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    // Here you would typically call an API to change the password
    console.log('Password change requested:', passwordData);
    alert('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowPasswordDialog(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        if (isEditing) {
          setEditedProfile((prev) => ({
            ...prev,
            profileImage: result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getRoleColor = (role: string) => {
    return role === 'admin'
      ? 'bg-purple-100 text-purple-800'
      : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={
                        isEditing
                          ? imagePreview || editedProfile.profileImage
                          : profile.profileImage
                      }
                      alt="Profile"
                    />
                    <AvatarFallback className="text-lg">
                      {(isEditing ? editedProfile.name : profile.name)
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute -bottom-2 -right-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 rounded-full p-0 cursor-pointer"
                          type="button"
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {isEditing ? editedProfile.name : profile.name}
                  </h2>
                  <p className="text-gray-600">
                    @{isEditing ? editedProfile.username : profile.username}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge
                      className={getRoleColor(
                        isEditing ? editedProfile.role : profile.role
                      )}
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      {(isEditing
                        ? editedProfile.role
                        : profile.role
                      ).toUpperCase()}
                    </Badge>
                    <Badge
                      className={getStatusColor(
                        isEditing ? editedProfile.status : profile.status
                      )}
                    >
                      {(isEditing
                        ? editedProfile.status
                        : profile.status
                      ).toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {!isEditing ? (
                  <Button onClick={handleEdit} variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your basic account details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                    {profile.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                {isEditing ? (
                  <Input
                    id="username"
                    value={editedProfile.username}
                    onChange={(e) =>
                      handleInputChange('username', e.target.value)
                    }
                    placeholder="Enter your username"
                  />
                ) : (
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                    @{profile.username}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="flex items-center text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    {profile.email}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editedProfile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="flex items-center text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    {profile.phone}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Additional Information
              </CardTitle>
              <CardDescription>Location and account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={editedProfile.address}
                    onChange={(e) =>
                      handleInputChange('address', e.target.value)
                    }
                    placeholder="Enter your address"
                  />
                ) : (
                  <div className="flex items-center text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    {profile.address}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                {isEditing ? (
                  <Input
                    disabled={isEditing}
                    id="role"
                    value={editedProfile.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    placeholder="Enter your role"
                    className={cn(
                      isEditing && 'bg-gray-100 opacity-50 cursor-not-allowed'
                    )}
                  />
                ) : (
                  <div className="flex items-center text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                    <Shield className="h-4 w-4 mr-2 text-gray-500" />
                    {profile.role.charAt(0).toUpperCase() +
                      profile.role.slice(1)}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Account Status</Label>
                {isEditing ? (
                  <select
                    disabled={isEditing}
                    id="status"
                    value={editedProfile.status}
                    onChange={(e) =>
                      handleInputChange('status', e.target.value)
                    }
                    className={cn(
                      'w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                      isEditing && 'bg-gray-100 opacity-50 cursor-not-allowed'
                    )}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                ) : (
                  <div className="flex items-center text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                    <div
                      className={`h-2 w-2 rounded-full mr-2 ${
                        profile.status === 'active'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    ></div>
                    {profile.status.charAt(0).toUpperCase() +
                      profile.status.slice(1)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your account security and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Password</h4>
                <p className="text-sm text-gray-600">
                  Last updated 30 days ago
                </p>
              </div>
              <Dialog
                open={showPasswordDialog}
                onOpenChange={setShowPasswordDialog}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">Change Password</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your current password and choose a new one.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPasswords.current ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              currentPassword: e.target.value,
                            }))
                          }
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => togglePasswordVisibility('current')}
                        >
                          {showPasswords.current ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showPasswords.new ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              newPassword: e.target.value,
                            }))
                          }
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => togglePasswordVisibility('new')}
                        >
                          {showPasswords.new ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showPasswords.confirm ? 'text' : 'password'}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                          placeholder="Confirm new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => togglePasswordVisibility('confirm')}
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPasswordDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="button" onClick={handlePasswordChange}>
                      Change Password
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
