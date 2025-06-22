'use client';

import UserPageAdd from '@/components/add-user-page';
import UserPageEdit from '@/components/edit-user-page';
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
  Crown,
  Edit,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Shield,
  Trash2,
  User,
  UserCheck,
  Users,
  UserX,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface UserData {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  role: 'admin' | 'manager' | 'user' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  profileImage: string;
  createdAt: string;
  lastLogin?: string;
}

export default function UsersListPage() {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      username: 'johndoe',
      phone: '0123456789',
      address: '123 Main Street, New York, NY 10001',
      role: 'admin',
      status: 'active',
      profileImage:
        'https://res.cloudinary.com/daaj6x4h2/image/upload/v1747548763/user_profile_images/qrdtjlanshpmyphpaacy.webp',
      createdAt: '2024-01-15',
      lastLogin: '2024-01-22',
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah@techcorp.com',
      username: 'sarahw',
      phone: '0123456790',
      address: '456 Tech Avenue, San Francisco, CA 94105',
      role: 'manager',
      status: 'active',
      profileImage: '',
      createdAt: '2024-01-18',
      lastLogin: '2024-01-21',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@company.com',
      username: 'mikej',
      phone: '0123456791',
      address: '789 Business Blvd, Chicago, IL 60601',
      role: 'user',
      status: 'pending',
      profileImage: '',
      createdAt: '2024-01-20',
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@startup.io',
      username: 'emilyd',
      phone: '0123456792',
      address: '321 Innovation Drive, Austin, TX 73301',
      role: 'viewer',
      status: 'inactive',
      profileImage: '',
      createdAt: '2024-01-12',
      lastLogin: '2024-01-19',
    },
    {
      id: '5',
      name: 'Alex Chen',
      email: 'alex@design.co',
      username: 'alexc',
      phone: '0123456793',
      address: '654 Creative Street, Los Angeles, CA 90210',
      role: 'user',
      status: 'active',
      profileImage: '',
      createdAt: '2024-01-16',
      lastLogin: '2024-01-22',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [deleteUser, setDeleteUser] = useState<UserData | null>(null);
  const [currentPage, setCurrentPage] = useState('list'); // list, add, edit
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4" />;
      case 'manager':
        return <Shield className="h-4 w-4" />;
      case 'user':
        return <User className="h-4 w-4" />;
      case 'viewer':
        return <Users className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const handleDeleteUser = (user: UserData) => {
    setDeleteUser(user);
  };

  const confirmDelete = () => {
    if (deleteUser) {
      setUsers(users.filter((user) => user.id !== deleteUser.id));
      setDeleteUser(null);
    }
  };

  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
    setCurrentPage('edit');
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setCurrentPage('add');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getUserStats = () => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === 'active').length,
      pending: users.filter((u) => u.status === 'pending').length,
      inactive: users.filter((u) => u.status === 'inactive').length,
      admins: users.filter((u) => u.role === 'admin').length,
    };
  };

  const stats = getUserStats();

  if (currentPage === 'add') {
    return (
      <AddUserPage
        onBack={() => setCurrentPage('list')}
        onUserAdded={(user) => {
          setUsers([
            ...users,
            {
              ...user,
              id: Date.now().toString(),
              createdAt: new Date().toISOString().split('T')[0],
            },
          ]);
          setCurrentPage('list');
        }}
      />
    );
  }

  if (currentPage === 'edit' && editingUser) {
    return (
      <EditUserPage
        user={editingUser}
        onBack={() => setCurrentPage('list')}
        onUserUpdated={(updatedUser) => {
          setUsers(
            users.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
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
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Users Management
                </h1>
                <p className="text-gray-600">
                  Manage user accounts, roles, and permissions
                </p>
              </div>
            </div>
            <Button
              onClick={handleAddUser}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.total}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.active}
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
                      {stats.pending}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <UserX className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Inactive
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.inactive}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Crown className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Admins</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.admins}
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
                placeholder="Search users by name, email, or username..."
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
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Shield className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({filteredUsers.length})</CardTitle>
            <CardDescription>
              Manage user accounts, view details, and perform actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={user.profileImage || '/placeholder.svg'}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-2 text-gray-400" />
                            {user.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-3 w-3 mr-2 text-gray-400" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(user.role)}>
                          {getRoleIcon(user.role)}
                          <span className="ml-1 capitalize">{user.role}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {getStatusIcon(user.status)}
                          <span className="ml-1 capitalize">{user.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.lastLogin ? (
                          <span className="text-sm text-gray-600">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">Never</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
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
                                navigator.clipboard.writeText(user.email)
                              }
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Copy Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(user)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No users found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || statusFilter !== 'all' || roleFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Get started by creating your first user'}
                </p>
                {!searchTerm &&
                  statusFilter === 'all' &&
                  roleFilter === 'all' && (
                    <Button onClick={handleAddUser}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First User
                    </Button>
                  )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={!!deleteUser}
          onOpenChange={() => setDeleteUser(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete User</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deleteUser?.name}"? This
                action cannot be undone. All user data will be permanently
                removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

// Add User Component (Placeholder)
function AddUserPage({
  onBack,
  onUserAdded,
}: {
  onBack: () => void;
  onUserAdded: (user: Omit<UserData, 'id' | 'createdAt'>) => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Users
          </Button>
        </div>
        <UserPageAdd />
      </div>
    </div>
  );
}

// Edit User Component (Placeholder)
function EditUserPage({
  user,
  onBack,
  onUserUpdated,
}: {
  user: UserData;
  onBack: () => void;
  onUserUpdated: (user: UserData) => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <UserPageEdit
          user={user}
          onUserUpdated={onUserUpdated}
          onBack={onBack}
        />
      </div>
    </div>
  );
}
