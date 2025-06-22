'use client';

import StorePageAdd from '@/components/add-store-page';
import StorePageEdit from '@/components/edit-store-page';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CheckCircle,
  Clock,
  Copy,
  Edit,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Store,
  Trash2,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface StoreData {
  storeId: string;
  storeName: string;
  storeEmail: string;
  storeClientId: string;
  storeClientSecret: string;
  storeStatus: 'active' | 'inactive' | 'pending';
  storeImage: string;
  storeDescription?: string;
  storeAddress?: string;
  storePhone?: string;
  createdAt: string;
}

export default function StoresListPage() {
  const [stores, setStores] = useState<StoreData[]>([
    {
      storeId: '10002764712',
      storeName: 'Zaytuna Group LLC',
      storeEmail: 'contact@zaytunagroup.com',
      storeClientId: 'ef19c693-6b6e-4244-a5fc-f2f92a2fb7bd',
      storeClientSecret:
        'JktfEJrDioZsyWFTwh94IvYaKvi0ma8ukqWZ_sREReE5CT1HLEzF9dA3f4XYDbDM4LxFDs',
      storeStatus: 'active',
      storeImage: '',
      storeDescription: 'Leading retail group specializing in consumer goods',
      storeAddress: '123 Business District, New York, NY 10001',
      storePhone: '+1-555-0123',
      createdAt: '2024-01-15',
    },
    {
      storeId: '10002764713',
      storeName: 'Tech Solutions Inc',
      storeEmail: 'info@techsolutions.com',
      storeClientId: 'a1b2c3d4-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
      storeClientSecret:
        'TechSecret123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      storeStatus: 'pending',
      storeImage: '',
      storeDescription: 'Technology solutions and consulting services',
      storeAddress: '456 Tech Park, San Francisco, CA 94105',
      storePhone: '+1-555-0456',
      createdAt: '2024-01-20',
    },
    {
      storeId: '10002764714',
      storeName: 'Fashion Hub',
      storeEmail: 'hello@fashionhub.com',
      storeClientId: 'f1a2s3h4-i5o6n7h8-u9b0-1234567890ab',
      storeClientSecret:
        'FashionHubSecretKey2024abcdefghijklmnopqrstuvwxyz1234567890ABCDEF',
      storeStatus: 'inactive',
      storeImage: '',
      storeDescription: 'Premium fashion and lifestyle brand',
      storeAddress: '789 Fashion Ave, Los Angeles, CA 90210',
      storePhone: '+1-555-0789',
      createdAt: '2024-01-10',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteStore, setDeleteStore] = useState<StoreData | null>(null);
  const [currentPage, setCurrentPage] = useState('list'); // list, add, edit
  const [editingStore, setEditingStore] = useState<StoreData | null>(null);

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.storeEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.storeId.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'all' || store.storeStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'inactive':
        return <XCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleDeleteStore = (store: StoreData) => {
    setDeleteStore(store);
  };

  const confirmDelete = () => {
    if (deleteStore) {
      setStores(
        stores.filter((store) => store.storeId !== deleteStore.storeId)
      );
      setDeleteStore(null);
    }
  };

  const handleEditStore = (store: StoreData) => {
    setEditingStore(store);
    setCurrentPage('edit');
  };

  const handleAddStore = () => {
    setEditingStore(null);
    setCurrentPage('add');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (currentPage === 'add') {
    return (
      <AddStorePage
        onBack={() => setCurrentPage('list')}
        onStoreAdded={(store) => {
          setStores([...stores, store]);
          setCurrentPage('list');
        }}
      />
    );
  }

  if (currentPage === 'edit' && editingStore) {
    return (
      <EditStorePage
        store={editingStore}
        onBack={() => setCurrentPage('list')}
        onStoreUpdated={(updatedStore) => {
          setStores(
            stores.map((store) =>
              store.storeId === updatedStore.storeId ? updatedStore : store
            )
          );
          setCurrentPage('list');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Store className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Stores Management
                </h1>
                <p className="text-gray-600">
                  Manage all your stores and their configurations
                </p>
              </div>
            </div>

            <Button
              onClick={handleAddStore}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Store
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Store className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Stores
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stores.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stores.filter((s) => s.storeStatus === 'active').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stores.filter((s) => s.storeStatus === 'pending').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Inactive
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {
                        stores.filter((s) => s.storeStatus === 'inactive')
                          .length
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search stores by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stores Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Stores ({filteredStores.length})</CardTitle>
            <CardDescription>
              Manage your stores, view details, and perform actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store</TableHead>
                    <TableHead>Store ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStores.map((store) => (
                    <TableRow key={store.storeId}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={store.storeImage || '/placeholder.svg'}
                              alt={store.storeName}
                            />
                            <AvatarFallback>
                              {getInitials(store.storeName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">
                              {store.storeName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {store.storeDescription}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {store.storeId}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(store.storeId)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{store.storeEmail}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(store.storeStatus)}>
                          {getStatusIcon(store.storeStatus)}
                          <span className="ml-1 capitalize">
                            {store.storeStatus}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(store.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                copyToClipboard(store.storeClientId)
                              }
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Client ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleEditStore(store)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Store
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteStore(store)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Store
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredStores.length === 0 && (
              <div className="text-center py-8">
                <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No stores found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Get started by creating your first store'}
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Button onClick={handleAddStore}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Store
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={!!deleteStore}
          onOpenChange={() => setDeleteStore(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Store</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deleteStore?.storeName}"? This
                action cannot be undone. All associated data will be permanently
                removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Store
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

// Add Store Component (Updated)
function AddStorePage({
  onBack,
  onStoreAdded,
}: {
  onBack: () => void;
  onStoreAdded: (store: StoreData) => void;
}) {
  // ... (Previous AddStorePage code with modifications for routing)
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Stores
          </Button>
        </div>
        {/* Rest of the add store form */}
        <StorePageAdd />
      </div>
    </div>
  );
}

// Edit Store Component
function EditStorePage({
  store,
  onBack,
  onStoreUpdated,
}: {
  store: StoreData;
  onBack: () => void;
  onStoreUpdated: (store: StoreData) => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <StorePageEdit
          store={store}
          onBack={onBack}
          onStoreUpdated={onStoreUpdated}
        />
      </div>
    </div>
  );
}
