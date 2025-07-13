// 'use client';

// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Checkbox } from '@/components/ui/checkbox';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   CheckCircle,
//   ChevronDown,
//   Copy,
//   Edit,
//   Filter,
//   Plus,
//   Search,
//   SortAsc,
//   Trash2,
//   XCircle,
// } from 'lucide-react';

// type Permission = {
//   create: boolean;
//   read: boolean;
//   update: boolean;
//   delete: boolean;
// };

// type RoleType = 'admin' | 'editor' | 'viewer' | 'custom';

// type Role = {
//   id: string;
//   name: string;
//   description?: string;
//   type: RoleType;
//   permissions: {
//     [module: string]: Permission;
//   };
//   createdAt: Date;
// };

// const modules = [
//   'Users',
//   'Products',
//   'Orders',
//   'Reports',
//   'Analytics',
//   'Settings',
// ];
// const actions = ['create', 'read', 'update', 'delete'] as const;

// const roleTypeColors: Record<RoleType, string> = {
//   admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
//   editor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
//   viewer: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
//   custom:
//     'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
// };

// export default function AllRolesPage({
//   roles,
//   filteredAndSortedRoles,
//   searchTerm,
//   setSearchTerm,
//   filterType,
//   setFilterType,
//   sortBy,
//   setSortBy,
//   setCurrentPage,
//   editingRole,
//   setEditingRole,
//   deleteDialog,
//   setDeleteDialog,
//   handleCloneRole,
//   handleDeleteRole,
//   handleUpdateRole,
//   handlePermissionChange,
//   handleSelectAll,
//   handleColumnSelectAll,
// }: {
//   roles: Role[];
//   filteredAndSortedRoles: Role[];
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
//   filterType: string;
//   setFilterType: (type: string) => void;
//   sortBy: string;
//   setSortBy: (sort: string) => void;
//   setCurrentPage: (page: string) => void;
//   editingRole: Role | null;
//   setEditingRole: (role: Role | null) => void;
//   deleteDialog: string | null;
//   setDeleteDialog: (id: string | null) => void;
//   handleCloneRole: (role: Role) => void;
//   handleDeleteRole: (roleId: string) => void;
//   handleUpdateRole: () => void;
//   handlePermissionChange: (
//     module: string,
//     action: keyof Permission,
//     checked: boolean,
//     isEditing: boolean
//   ) => void;
//   handleSelectAll: (
//     module: string,
//     checked: boolean,
//     isEditing: boolean
//   ) => void;
//   handleColumnSelectAll: (
//     action: keyof Permission,
//     checked: boolean,
//     isEditing: boolean
//   ) => void;
// }) {
//   const getPermissionCount = (permissions: {
//     [module: string]: Permission;
//   }) => {
//     return Object.values(permissions).reduce(
//       (count, modulePerms) =>
//         count + Object.values(modulePerms).filter(Boolean).length,
//       0
//     );
//   };

//   const getPermissionIcon = (hasPermission: boolean) => {
//     return hasPermission ? (
//       <CheckCircle className="h-4 w-4 text-green-500" />
//     ) : (
//       <XCircle className="h-4 w-4 text-red-500" />
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">All Roles</h1>
//         <Button onClick={() => setCurrentPage('create-role')}>
//           <Plus className="h-4 w-4 mr-2" />
//           Create New Role
//         </Button>
//       </div>

//       <Card>
//         <CardContent className="p-6">
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search roles..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline">
//                   <Filter className="h-4 w-4 mr-2" />
//                   Filter
//                   <ChevronDown className="h-4 w-4 ml-2" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem onClick={() => setFilterType('all')}>
//                   All Types
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setFilterType('admin')}>
//                   Admin
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setFilterType('editor')}>
//                   Editor
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setFilterType('viewer')}>
//                   Viewer
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setFilterType('custom')}>
//                   Custom
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline">
//                   <SortAsc className="h-4 w-4 mr-2" />
//                   Sort
//                   <ChevronDown className="h-4 w-4 ml-2" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem onClick={() => setSortBy('name')}>
//                   Name (A-Z)
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setSortBy('permissions-desc')}>
//                   Most Permissions
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setSortBy('permissions-asc')}>
//                   Least Permissions
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => setSortBy('date')}>
//                   Newest First
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>

//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {filteredAndSortedRoles.map((role) => (
//               <Card
//                 key={role.id}
//                 className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
//               >
//                 <CardHeader className="pb-3">
//                   <div className="flex items-start justify-between">
//                     <div className="space-y-1">
//                       <CardTitle className="text-lg">{role.name}</CardTitle>
//                       <Badge className={roleTypeColors[role.type]}>
//                         {role.type}
//                       </Badge>
//                     </div>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="sm">
//                           <ChevronDown className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent>
//                         <DropdownMenuItem onClick={() => setEditingRole(role)}>
//                           <Edit className="h-4 w-4 mr-2" />
//                           Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuItem onClick={() => handleCloneRole(role)}>
//                           <Copy className="h-4 w-4 mr-2" />
//                           Clone
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() => setDeleteDialog(role.id)}
//                           className="text-destructive"
//                         >
//                           <Trash2 className="h-4 w-4 mr-2" />
//                           Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                   {role.description && (
//                     <CardDescription className="text-sm">
//                       {role.description}
//                     </CardDescription>
//                   )}
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="font-medium">Permissions</span>
//                       <span className="text-muted-foreground">
//                         {getPermissionCount(role.permissions)} total
//                       </span>
//                     </div>
//                     {modules.map((module) => {
//                       const modulePerms = role.permissions[module];
//                       const activePerms = Object.entries(modulePerms).filter(
//                         ([, active]) => active
//                       );
//                       if (activePerms.length === 0) return null;

//                       return (
//                         <div key={module} className="space-y-1">
//                           <div className="font-medium text-sm">{module}:</div>
//                           <div className="flex flex-wrap gap-1">
//                             {Object.entries(modulePerms).map(
//                               ([action, enabled]) => (
//                                 <div
//                                   key={action}
//                                   className="flex items-center space-x-1"
//                                 >
//                                   {getPermissionIcon(enabled)}
//                                   <span className="text-xs capitalize">
//                                     {action}
//                                   </span>
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {filteredAndSortedRoles.length === 0 && (
//             <div className="text-center py-12">
//               <div className="text-muted-foreground">
//                 No roles found matching your criteria
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Edit Role Dialog */}
//       <Dialog open={!!editingRole} onOpenChange={() => setEditingRole(null)}>
//         <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Edit Role</DialogTitle>
//             <DialogDescription>
//               Update role details and permissions
//             </DialogDescription>
//           </DialogHeader>
//           {editingRole && (
//             <div className="space-y-4">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="editRoleName">Role Name</Label>
//                   <Input
//                     id="editRoleName"
//                     value={editingRole.name}
//                     onChange={(e) =>
//                       setEditingRole({ ...editingRole, name: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="editRoleType">Role Type</Label>
//                   <Select
//                     value={editingRole.type}
//                     onValueChange={(value: RoleType) =>
//                       setEditingRole({ ...editingRole, type: value })
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="admin">Admin</SelectItem>
//                       <SelectItem value="editor">Editor</SelectItem>
//                       <SelectItem value="viewer">Viewer</SelectItem>
//                       <SelectItem value="custom">Custom</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="editRoleDescription">Description</Label>
//                 <Textarea
//                   id="editRoleDescription"
//                   value={editingRole.description}
//                   onChange={(e) =>
//                     setEditingRole({
//                       ...editingRole,
//                       description: e.target.value,
//                     })
//                   }
//                   rows={3}
//                 />
//               </div>
//               <div className="border rounded-lg overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-muted">
//                       <tr>
//                         <th className="text-left p-3 font-medium">Module</th>
//                         {actions.map((action) => (
//                           <th
//                             key={action}
//                             className="text-center p-3 font-medium min-w-[100px]"
//                           >
//                             <div className="flex flex-col items-center space-y-2">
//                               <span className="capitalize">{action}</span>
//                               <Checkbox
//                                 checked={modules.every(
//                                   (module) =>
//                                     editingRole.permissions[module]?.[action]
//                                 )}
//                                 onCheckedChange={(checked) =>
//                                   handleColumnSelectAll(action, !!checked, true)
//                                 }
//                               />
//                             </div>
//                           </th>
//                         ))}
//                         <th className="text-center p-3 font-medium">
//                           Select All
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {modules.map((module) => (
//                         <tr
//                           key={module}
//                           className="border-t hover:bg-muted/50 transition-colors"
//                         >
//                           <td className="p-3 font-medium">{module}</td>
//                           {actions.map((action) => (
//                             <td key={action} className="text-center p-3">
//                               <Checkbox
//                                 checked={
//                                   editingRole.permissions[module]?.[action] ||
//                                   false
//                                 }
//                                 onCheckedChange={(checked) =>
//                                   handlePermissionChange(
//                                     module,
//                                     action,
//                                     !!checked,
//                                     true
//                                   )
//                                 }
//                               />
//                             </td>
//                           ))}
//                           <td className="text-center p-3">
//                             <Checkbox
//                               checked={actions.every(
//                                 (action) =>
//                                   editingRole.permissions[module]?.[action]
//                               )}
//                               onCheckedChange={(checked) =>
//                                 handleSelectAll(module, !!checked, true)
//                               }
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setEditingRole(null)}>
//               Cancel
//             </Button>
//             <Button onClick={handleUpdateRole}>Update Role</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete Role</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this role? This action cannot be
//               undone and may affect users who have this role assigned.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setDeleteDialog(null)}>
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={() => deleteDialog && handleDeleteRole(deleteDialog)}
//             >
//               Delete Role
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

export default function page() {
  return <div>page</div>;
}
