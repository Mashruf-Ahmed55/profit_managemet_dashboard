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
import { useStoresData } from '@/hooks/useStoreData';
import { Select } from '@radix-ui/react-select';
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
import { useEffect, useState } from 'react';

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
  const { data: stores = [], isLoading, isError } = useStoresData();

  const [localStores, setLocalStores] = useState<StoreData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteStore, setDeleteStore] = useState<StoreData | null>(null);
  const [currentPage, setCurrentPage] = useState<'list' | 'add' | 'edit'>(
    'list'
  );
  const [editingStore, setEditingStore] = useState<StoreData | null>(null);

  // Populate localStores when data changes
  useEffect(() => {
    setLocalStores(
      stores.map((store: any) => ({
        storeId: store.storeId,
        storeName: store.storeName,
        storeEmail: store.storeEmail,
        storeClientId: store.storeClientId,
        storeClientSecret: store.storeClientSecret,
        storeStatus: store.storeStatus,
        storeImage: store.storeImage,
        storeDescription: store.storeDescription ?? '',
        storeAddress: store.storeAddress ?? '',
        storePhone: store.storePhone ?? '',
        createdAt: store.createdAt ?? new Date().toISOString(),
      }))
    );
  }, [stores]);

  // Loading & Error states
  if (isLoading)
    return (
      <div className="p-10 text-center text-gray-600">Loading stores...</div>
    );
  if (isError)
    return (
      <div className="p-10 text-center text-red-600">
        Failed to load stores. Please try again later.
      </div>
    );

  const filteredStores = localStores.filter((store) => {
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
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const handleDeleteStore = (store: StoreData) => {
    setDeleteStore(store);
  };

  const confirmDelete = () => {
    if (deleteStore) {
      setLocalStores(
        localStores.filter((store) => store.storeId !== deleteStore.storeId)
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
    // Add toast notification here if you want
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
          setLocalStores([...localStores, store]);
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
          setLocalStores(
            localStores.map((store) =>
              store.storeId === updatedStore.storeId ? updatedStore : store
            )
          );
          setCurrentPage('list');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Store className="h-10 w-10 text-blue-600" />
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Stores Management
              </h1>
              <p className="text-gray-600">
                Manage all your stores and their configurations
              </p>
            </div>
          </div>

          <Button
            onClick={handleAddStore}
            className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 text-white flex items-center gap-2 px-5 py-2 rounded-md shadow-md transition"
          >
            <Plus className="h-5 w-5" />
            Add New Store
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {[
            {
              label: 'Total Stores',
              value: localStores.length,
              icon: <Store className="h-6 w-6 text-blue-600" />,
              bg: 'bg-blue-100',
              text: 'text-blue-600',
            },
            {
              label: 'Active',
              value: localStores.filter((s) => s.storeStatus === 'active')
                .length,
              icon: <CheckCircle className="h-6 w-6 text-green-600" />,
              bg: 'bg-green-100',
              text: 'text-green-600',
            },
            {
              label: 'Pending',
              value: localStores.filter((s) => s.storeStatus === 'pending')
                .length,
              icon: <Clock className="h-6 w-6 text-yellow-600" />,
              bg: 'bg-yellow-100',
              text: 'text-yellow-600',
            },
            {
              label: 'Inactive',
              value: localStores.filter((s) => s.storeStatus === 'inactive')
                .length,
              icon: <XCircle className="h-6 w-6 text-red-600" />,
              bg: 'bg-red-100',
              text: 'text-red-600',
            },
          ].map(({ label, value, icon, bg, text }) => (
            <Card key={label} className="shadow-sm rounded-lg">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-md ${bg}`}>{icon}</div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{label}</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search stores by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-lg"
              autoComplete="off"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
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

        {/* Stores Table */}
        <Card className="shadow-lg rounded-lg border border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-xl font-semibold">
              All Stores ({filteredStores.length})
            </CardTitle>
            <CardDescription>
              Manage your stores, view details, and perform actions
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <Table className="min-w-full">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="py-3 px-6 text-left text-gray-700">
                    Store
                  </TableHead>
                  <TableHead className="py-3 px-6 text-left text-gray-700">
                    Store ID
                  </TableHead>
                  <TableHead className="py-3 px-6 text-left text-gray-700">
                    Email
                  </TableHead>
                  <TableHead className="py-3 px-6 text-left text-gray-700">
                    Status
                  </TableHead>
                  <TableHead className="py-3 px-6 text-left text-gray-700">
                    Created
                  </TableHead>
                  <TableHead className="py-3 px-6 text-left text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStores.map((store) => (
                  <TableRow
                    key={store.storeId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="flex items-center gap-4 py-3 px-6">
                      <Avatar className="h-10 w-10 rounded-full ring-1 ring-gray-300 overflow-hidden">
                        <AvatarImage
                          src={store.storeImage || '/placeholder.svg'}
                          alt={store.storeName}
                        />
                        <AvatarFallback className="text-gray-500">
                          {getInitials(store.storeName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {store.storeName}
                        </p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {store.storeDescription || 'No description'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700">
                          {store.storeId}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(store.storeId)}
                          aria-label="Copy Store ID"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-6">
                      {store.storeEmail}
                    </TableCell>
                    <TableCell className="py-3 px-6">
                      <Badge
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                          store.storeStatus
                        )}`}
                      >
                        {getStatusIcon(store.storeStatus)}
                        <span className="capitalize">{store.storeStatus}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 px-6 whitespace-nowrap">
                      {new Date(store.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-3 px-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 rounded-full"
                            aria-label="Open actions"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => copyToClipboard(store.storeClientId)}
                            className="flex items-center gap-2"
                          >
                            <Copy className="h-4 w-4" />
                            Copy Client ID
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleEditStore(store)}
                            className="flex items-center gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            Edit Store
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteStore(store)}
                            className="flex items-center gap-2 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Store
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredStores.length === 0 && (
              <div className="text-center py-16">
                <Store className="mx-auto h-14 w-14 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No stores found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Get started by creating your first store'}
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Button
                    onClick={handleAddStore}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-5 w-5" />
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
          <AlertDialogContent className="max-w-md rounded-lg shadow-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-semibold">
                Delete Store
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{' '}
                <span className="font-semibold">
                  "{deleteStore?.storeName}"
                </span>
                ? This action cannot be undone. All associated data will be
                permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="space-x-4">
              <AlertDialogCancel className="px-4 py-2 rounded-md hover:bg-gray-100">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500"
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

function AddStorePage({
  onBack,
  onStoreAdded,
}: {
  onBack: () => void;
  onStoreAdded: (store: StoreData) => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={onBack} className="mb-6">
          ← Back to Stores
        </Button>
        <StorePageAdd />
      </div>
    </div>
  );
}

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
        <Button variant="outline" onClick={onBack} className="mb-6">
          ← Back to Stores
        </Button>
        <StorePageEdit
          store={store}
          onBack={onBack}
          onStoreUpdated={onStoreUpdated}
        />
      </div>
    </div>
  );
}
