'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: number;
  mart: string;
  sku: string;
  condition: string;
  availability: string;
  wpid: string;
  upc: string;
  gtin: string;
  product_name: string;
  product_type: string;
  on_hand: number;
  available: number;
  published_status: string;
  lifecycle_status: string;
  store_id: string;
  created_at: string;
  updated_at: string;
}

interface ProductEditModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export function ProductEditModal({
  product,
  isOpen,
  onClose,
  onSave,
}: ProductEditModalProps) {
  const [formData, setFormData] = useState<Product>({ ...product });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      updated_at: new Date().toISOString(),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSave(formData);
    setSaving(false);
  };

  const handleCancel = () => {
    setFormData({ ...product });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product_name">Product Name</Label>
                  <Textarea
                    id="product_name"
                    value={formData.product_name}
                    onChange={(e) =>
                      handleInputChange('product_name', e.target.value)
                    }
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product_type">Product Type</Label>
                  <Input
                    id="product_type"
                    value={formData.product_type}
                    onChange={(e) =>
                      handleInputChange('product_type', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) =>
                      handleInputChange('condition', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Used">Used</SelectItem>
                      <SelectItem value="Refurbished">Refurbished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    value={formData.availability}
                    onValueChange={(value) =>
                      handleInputChange('availability', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In_stock">In Stock</SelectItem>
                      <SelectItem value="Out_of_stock">Out of Stock</SelectItem>
                      <SelectItem value="Limited_stock">
                        Limited Stock
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="on_hand">Units On Hand</Label>
                  <Input
                    id="on_hand"
                    type="number"
                    value={formData.on_hand}
                    onChange={(e) =>
                      handleInputChange(
                        'on_hand',
                        Number.parseInt(e.target.value) || 0
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="available">Units Available</Label>
                  <Input
                    id="available"
                    type="number"
                    value={formData.available}
                    onChange={(e) =>
                      handleInputChange(
                        'available',
                        Number.parseInt(e.target.value) || 0
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Codes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Codes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => handleInputChange('sku', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="upc">UPC</Label>
                  <Input
                    id="upc"
                    value={formData.upc}
                    onChange={(e) => handleInputChange('upc', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gtin">GTIN</Label>
                  <Input
                    id="gtin"
                    value={formData.gtin}
                    onChange={(e) => handleInputChange('gtin', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wpid">WPID</Label>
                  <Input
                    id="wpid"
                    value={formData.wpid}
                    onChange={(e) => handleInputChange('wpid', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="published_status">Published Status</Label>
                  <Select
                    value={formData.published_status}
                    onValueChange={(value) =>
                      handleInputChange('published_status', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lifecycle_status">Lifecycle Status</Label>
                  <Select
                    value={formData.lifecycle_status}
                    onValueChange={(value) =>
                      handleInputChange('lifecycle_status', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="DISCONTINUED">Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={handleCancel} disabled={saving}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
