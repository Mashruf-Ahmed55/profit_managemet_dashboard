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
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Separator } from '@/components/ui/separator';
// import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

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

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
//   roles: string[];
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

// export default function AssignRolesPage({
//   roles,
//   users,
//   selectedUser,
//   setSelectedUser,
//   userRoles,
//   setUserRoles,
//   handleUserSelect,
//   handleRoleToggle,
//   handleAssignRoles,
//   setCurrentPage,
// }: {
//   roles: Role[];
//   users: User[];
//   selectedUser: User | null;
//   setSelectedUser: (user: User | null) => void;
//   userRoles: string[];
//   setUserRoles: (roles: string[]) => void;
//   handleUserSelect: (userId: string) => void;
//   handleRoleToggle: (roleId: string, checked: boolean) => void;
//   handleAssignRoles: () => void;
//   setCurrentPage: (page: string) => void;
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

//   const getMergedPermissions = (roleIds: string[]) => {
//     const merged: { [module: string]: Permission } = {};
//     modules.forEach((module) => {
//       merged[module] = {
//         create: false,
//         read: false,
//         update: false,
//         delete: false,
//       };
//     });

//     roleIds.forEach((roleId) => {
//       const role = roles.find((r) => r.id === roleId);
//       if (role) {
//         Object.entries(role.permissions).forEach(([module, perms]) => {
//           Object.entries(perms).forEach(([action, enabled]) => {
//             if (enabled) {
//               merged[module][action as keyof Permission] = true;
//             }
//           });
//         });
//       }
//     });

//     return merged;
//   };

//   const getPermissionIcon = (hasPermission: boolean) => {
//     return hasPermission ? (
//       <CheckCircle className="h-4 w-4 text-green-500" />
//     ) : (
//       <XCircle className="h-4 w-4 text-red-500" />
//     );
//   };

//   const mergedPermissions = selectedUser ? getMergedPermissions(userRoles) : {};
//   const totalPermissions = getPermissionCount(mergedPermissions);

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center space-x-4">
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => setCurrentPage('all-roles')}
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Roles
//         </Button>
//         <h1 className="text-3xl font-bold">Assign Roles to Users</h1>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-3">
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>User Role Assignment</CardTitle>
//               <CardDescription>Select a user and assign roles</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label>Select User</Label>
//                 <Select onValueChange={handleUserSelect}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Choose a user" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {users.map((user) => (
//                       <SelectItem key={user.id} value={user.id}>
//                         <div className="flex items-center space-x-2">
//                           <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
//                             {user.name.charAt(0)}
//                           </div>
//                           <div>
//                             <div className="font-medium">{user.name}</div>
//                             <div className="text-sm text-muted-foreground">
//                               {user.email}
//                             </div>
//                           </div>
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {selectedUser && (
//                 <div className="space-y-4">
//                   <Card className="bg-muted/50">
//                     <CardContent className="p-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
//                           {selectedUser.name.charAt(0)}
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-medium">{selectedUser.name}</h3>
//                           <p className="text-sm text-muted-foreground">
//                             {selectedUser.email}
//                           </p>
//                           <div className="mt-2">
//                             <div className="text-sm font-medium mb-1">
//                               Current Roles:
//                             </div>
//                             <div className="flex flex-wrap gap-2">
//                               {selectedUser.roles.length > 0 ? (
//                                 selectedUser.roles.map((roleId) => {
//                                   const role = roles.find(
//                                     (r) => r.id === roleId
//                                   );
//                                   return role ? (
//                                     <Badge
//                                       key={roleId}
//                                       className={roleTypeColors[role.type]}
//                                     >
//                                       {role.name}
//                                     </Badge>
//                                   ) : null;
//                                 })
//                               ) : (
//                                 <span className="text-muted-foreground text-sm">
//                                   No roles assigned
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>

//                   <div className="space-y-3">
//                     <Label>Available Roles</Label>
//                     <div className="space-y-2">
//                       {['admin', 'editor', 'viewer', 'custom'].map((type) => {
//                         const typeRoles = roles.filter(
//                           (role) => role.type === type
//                         );
//                         if (typeRoles.length === 0) return null;

//                         return (
//                           <div key={type} className="space-y-2">
//                             <div className="text-sm font-medium capitalize text-muted-foreground">
//                               {type} Roles
//                             </div>
//                             {typeRoles.map((role) => (
//                               <div
//                                 key={role.id}
//                                 className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
//                               >
//                                 <Checkbox
//                                   checked={userRoles.includes(role.id)}
//                                   onCheckedChange={(checked) =>
//                                     handleRoleToggle(role.id, !!checked)
//                                   }
//                                 />
//                                 <div className="flex-1">
//                                   <div className="flex items-center space-x-2">
//                                     <span className="font-medium">
//                                       {role.name}
//                                     </span>
//                                     <Badge
//                                       className={roleTypeColors[role.type]}
//                                       variant="outline"
//                                     >
//                                       {role.type}
//                                     </Badge>
//                                   </div>
//                                   {role.description && (
//                                     <div className="text-sm text-muted-foreground mt-1">
//                                       {role.description}
//                                     </div>
//                                   )}
//                                   <div className="text-xs text-muted-foreground mt-1">
//                                     {getPermissionCount(role.permissions)}{' '}
//                                     permissions
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   <Button
//                     onClick={handleAssignRoles}
//                     className="w-full"
//                     size="lg"
//                   >
//                     Assign Roles
//                   </Button>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {selectedUser && userRoles.length > 0 && (
//           <div className="lg:col-span-1">
//             <Card className="sticky top-6">
//               <CardHeader>
//                 <CardTitle>Permissions Preview</CardTitle>
//                 <CardDescription>
//                   Combined permissions from selected roles
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="text-sm">
//                   <span className="font-medium">Total Permissions: </span>
//                   <span className="text-green-600">{totalPermissions}</span>
//                 </div>
//                 <Separator />
//                 <div className="space-y-3">
//                   {modules.map((module) => {
//                     const modulePerms = mergedPermissions[module];
//                     const activePerms = Object.entries(
//                       modulePerms || {}
//                     ).filter(([, active]) => active);

//                     return (
//                       <div key={module} className="space-y-1">
//                         <div className="font-medium text-sm">{module}</div>
//                         <div className="flex flex-wrap gap-1">
//                           {actions.map((action) => (
//                             <div
//                               key={action}
//                               className="flex items-center space-x-1"
//                             >
//                               {getPermissionIcon(
//                                 modulePerms?.[action] || false
//                               )}
//                               <span className="text-xs capitalize">
//                                 {action}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

export default function page() {
  return <div>page</div>;
}
