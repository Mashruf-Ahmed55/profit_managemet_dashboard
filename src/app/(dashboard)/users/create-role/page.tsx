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
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Separator } from '@/components/ui/separator';
// import { Textarea } from '@/components/ui/textarea';
// import { CheckCircle, Eye, EyeOff, X, XCircle } from 'lucide-react';

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

// export default function CreateRolePage({
//   newRole,
//   setNewRole,
//   showPreview,
//   setShowPreview,
//   handleSaveRole,
//   handlePermissionChange,
//   handleSelectAll,
//   handleColumnSelectAll,
//   removePermissionChip,
// }: {
//   newRole: Omit<Role, 'id' | 'createdAt'>;
//   setNewRole: (role: Omit<Role, 'id' | 'createdAt'>) => void;
//   showPreview: boolean;
//   setShowPreview: (show: boolean) => void;
//   handleSaveRole: () => void;
//   handlePermissionChange: (
//     module: string,
//     action: keyof Permission,
//     checked: boolean
//   ) => void;
//   handleSelectAll: (module: string, checked: boolean) => void;
//   handleColumnSelectAll: (action: keyof Permission, checked: boolean) => void;
//   removePermissionChip: (module: string, action: string) => void;
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

//   const getSelectedPermissions = (permissions: {
//     [module: string]: Permission;
//   }) => {
//     const selected: string[] = [];
//     Object.entries(permissions).forEach(([module, perms]) => {
//       Object.entries(perms).forEach(([action, enabled]) => {
//         if (enabled) {
//           selected.push(`${module}: ${action}`);
//         }
//       });
//     });
//     return selected;
//   };

//   const permissionCount = getPermissionCount(newRole.permissions);
//   const selectedPermissions = getSelectedPermissions(newRole.permissions);

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
//         <h1 className="text-3xl font-bold">Create Role</h1>
//         <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
//           {showPreview ? (
//             <EyeOff className="h-4 w-4 mr-2" />
//           ) : (
//             <Eye className="h-4 w-4 mr-2" />
//           )}
//           {showPreview ? 'Hide Preview' : 'Show Preview'}
//         </Button>
//       </div>

//       {/* <div className="grid gap-6 lg:grid-cols-3">
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>Role Details</CardTitle>
//               <CardDescription>
//                 Create a new role and assign permissions
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="roleName">Role Name *</Label>
//                   <Input
//                     id="roleName"
//                     placeholder="Enter role name"
//                     value={newRole.name}
//                     onChange={(e) =>
//                       setNewRole({ ...newRole, name: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="roleType">Role Type</Label>
//                   <Select
//                     value={newRole.type}
//                     onValueChange={(value: RoleType) =>
//                       setNewRole({ ...newRole, type: value })
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
//                 <Label htmlFor="roleDescription">Description</Label>
//                 <Textarea
//                   id="roleDescription"
//                   placeholder="Enter role description (optional)"
//                   value={newRole.description}
//                   onChange={(e) =>
//                     setNewRole({ ...newRole, description: e.target.value })
//                   }
//                   rows={3}
//                 />
//               </div>

//               <Separator />

//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <Label>Permissions Matrix</Label>
//                   <div className="text-sm text-muted-foreground">
//                     {permissionCount} permission
//                     {permissionCount !== 1 ? 's' : ''} selected
//                   </div>
//                 </div>

//                 <div className="border rounded-lg overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead className="bg-muted">
//                         <tr>
//                           <th className="text-left p-3 font-medium">Module</th>
//                           {actions.map((action) => (
//                             <th
//                               key={action}
//                               className="text-center p-3 font-medium min-w-[100px]"
//                             >
//                               <div className="flex flex-col items-center space-y-2">
//                                 <span className="capitalize">{action}</span>
//                                 <Checkbox
//                                   checked={modules.every(
//                                     (module) =>
//                                       newRole.permissions[module]?.[action]
//                                   )}
//                                   onCheckedChange={(checked) =>
//                                     handleColumnSelectAll(action, !!checked)
//                                   }
//                                 />
//                               </div>
//                             </th>
//                           ))}
//                           <th className="text-center p-3 font-medium">
//                             Select All
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {modules.map((module) => (
//                           <tr
//                             key={module}
//                             className="border-t hover:bg-muted/50 transition-colors"
//                           >
//                             <td className="p-3 font-medium">{module}</td>
//                             {actions.map((action) => (
//                               <td key={action} className="text-center p-3">
//                                 <Checkbox
//                                   checked={
//                                     newRole.permissions[module]?.[action] ||
//                                     false
//                                   }
//                                   onCheckedChange={(checked) =>
//                                     handlePermissionChange(
//                                       module,
//                                       action,
//                                       !!checked
//                                     )
//                                   }
//                                 />
//                               </td>
//                             ))}
//                             <td className="text-center p-3">
//                               <Checkbox
//                                 checked={actions.every(
//                                   (action) =>
//                                     newRole.permissions[module]?.[action]
//                                 )}
//                                 onCheckedChange={(checked) =>
//                                   handleSelectAll(module, !!checked)
//                                 }
//                               />
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>

//               {selectedPermissions.length > 0 && (
//                 <div className="space-y-2">
//                   <Label>Selected Permissions</Label>
//                   <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
//                     {selectedPermissions.map((permission) => {
//                       const [module, action] = permission.split(': ');
//                       return (
//                         <Badge
//                           key={permission}
//                           variant="secondary"
//                           className="flex items-center gap-1"
//                         >
//                           {permission}
//                           <X
//                             className="h-3 w-3 cursor-pointer hover:text-destructive"
//                             onClick={() => removePermissionChip(module, action)}
//                           />
//                         </Badge>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <Button onClick={handleSaveRole} className="w-full" size="lg">
//                 Save Role
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//         {showPreview && (
//           <div className="lg:col-span-1">
//             <Card className="sticky top-6">
//               <CardHeader>
//                 <CardTitle>Role Preview</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <div className="font-medium">
//                     {newRole.name || 'Untitled Role'}
//                   </div>
//                   <Badge className={roleTypeColors[newRole.type]}>
//                     {newRole.type}
//                   </Badge>
//                 </div>
//                 {newRole.description && (
//                   <p className="text-sm text-muted-foreground">
//                     {newRole.description}
//                   </p>
//                 )}
//                 <div className="space-y-2">
//                   <div className="text-sm font-medium">
//                     Permissions ({permissionCount})
//                   </div>
//                   {modules.map((module) => {
//                     const modulePerms = newRole.permissions[module];
//                     const activePerms = Object.entries(modulePerms).filter(
//                       ([, active]) => active
//                     );
//                     if (activePerms.length === 0) return null;

//                     return (
//                       <div key={module} className="text-xs">
//                         <span className="font-medium">{module}:</span>{' '}
//                         {activePerms.map(([perm], index) => (
//                           <span key={perm}>
//                             {index > 0 && ', '}
//                             <span className="text-green-600">{perm}</span>
//                           </span>
//                         ))}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div> */}
//     </div>
//   );
// }

export default function page() {
  return <div>page</div>;
}
