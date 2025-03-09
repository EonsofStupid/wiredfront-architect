
import React, { useEffect, useState } from 'react';
import { useThemeManager } from '@/hooks/useThemeManager';
import { useAppTheme } from '@/components/providers/ThemeProvider';
import { Theme, ThemeVersion, ThemeAuditLog, ThemeStatus } from '@/types/theme';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Check, 
  Clock, 
  Copy, 
  Edit, 
  FileBox, 
  History, 
  Info, 
  Loader2, 
  Plus, 
  RefreshCw, 
  Star, 
  Trash, 
  User 
} from 'lucide-react';

const ThemeManager: React.FC = () => {
  const { loading, themes, versions, auditLogs, fetchThemes, fetchThemeVersions, fetchAuditLogs, setDefaultTheme, applyThemeVersion, deleteTheme, cloneTheme } = useThemeManager();
  const { activeTheme, themeVersion, refreshTheme } = useAppTheme();
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [showVersionDialog, setShowVersionDialog] = useState(false);
  const [showCloneDialog, setShowCloneDialog] = useState(false);
  const [cloneName, setCloneName] = useState('');
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);

  // Fetch themes when component mounts
  useEffect(() => {
    fetchThemes();
  }, []);

  // When a theme is selected, fetch its versions and audit logs
  useEffect(() => {
    if (selectedThemeId) {
      fetchThemeVersions(selectedThemeId);
      fetchAuditLogs(selectedThemeId);
    }
  }, [selectedThemeId]);

  const handleThemeSelect = (themeId: string) => {
    setSelectedThemeId(themeId);
  };

  const handleSetDefault = async (themeId: string) => {
    const success = await setDefaultTheme(themeId);
    if (success) {
      await fetchThemes();
    }
  };

  const handleApplyVersion = async () => {
    if (selectedThemeId && selectedVersion) {
      const success = await applyThemeVersion(selectedThemeId, selectedVersion);
      if (success) {
        await fetchThemeVersions(selectedThemeId);
        await fetchAuditLogs(selectedThemeId);
        setShowVersionDialog(false);
      }
    }
  };

  const handleDeleteTheme = async (themeId: string) => {
    const success = await deleteTheme(themeId);
    if (success) {
      if (selectedThemeId === themeId) {
        setSelectedThemeId(null);
      }
    }
  };

  const handleCloneTheme = async () => {
    if (selectedThemeId && cloneName) {
      const clonedTheme = await cloneTheme(selectedThemeId, cloneName);
      if (clonedTheme) {
        setShowCloneDialog(false);
        setCloneName('');
      }
    } else {
      toast({
        title: "Error",
        description: "Please enter a name for the cloned theme",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: ThemeStatus) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Active</Badge>;
      case 'draft':
        return <Badge variant="outline" className="border-yellow-500/50 text-yellow-500">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline" className="border-gray-500/50 text-gray-500">Archived</Badge>;
      case 'pending_approval':
        return <Badge variant="outline" className="border-blue-500/50 text-blue-500">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Find the selected theme details
  const selectedTheme = themes.find(theme => theme.id === selectedThemeId);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold cyber-text">Theme Manager</h1>
        <div className="space-x-4">
          <Button variant="outline" className="gap-2" onClick={() => refreshTheme()}>
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Theme
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Theme List */}
        <Card className="glass-neo cyber-grid md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Available Themes</span>
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            </CardTitle>
            <CardDescription>Select a theme to manage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {themes.map((theme) => (
                <div 
                  key={theme.id}
                  className={`p-4 rounded-md transition-all cursor-pointer ${
                    selectedThemeId === theme.id 
                      ? 'glass-neo cyber-grid border border-primary/50' 
                      : 'hover:bg-background/50 border border-border/50'
                  }`}
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center gap-2">
                      {theme.name}
                      {theme.is_default && <Star className="w-4 h-4 text-yellow-500" />}
                    </h3>
                    {getStatusBadge(theme.status)}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {theme.description || 'No description'}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>v{theme.version}</span>
                    <span>
                      {theme.updated_at && new Date(theme.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}

              {themes.length === 0 && !loading && (
                <div className="py-8 text-center text-muted-foreground">
                  <FileBox className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>No themes found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Theme Details */}
        <Card className="glass-neo cyber-grid md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedTheme ? selectedTheme.name : 'Theme Details'}
            </CardTitle>
            <CardDescription>
              {selectedTheme 
                ? `Version ${selectedTheme.version} • ${selectedTheme.status}` 
                : 'Select a theme to view details'}
            </CardDescription>
          </CardHeader>
          
          {selectedTheme ? (
            <>
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="glass mb-6">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="versions">Versions</TabsTrigger>
                    <TabsTrigger value="audit">Audit Log</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Theme Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Status</Label>
                            <div className="mt-1">{getStatusBadge(selectedTheme.status)}</div>
                          </div>
                          <div>
                            <Label>Default</Label>
                            <div className="mt-1">
                              {selectedTheme.is_default 
                                ? <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">Default</Badge>
                                : <span className="text-muted-foreground">No</span>
                              }
                            </div>
                          </div>
                          <div>
                            <Label>Public</Label>
                            <div className="mt-1">
                              {selectedTheme.is_public 
                                ? <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Public</Badge>
                                : <span className="text-muted-foreground">Private</span>
                              }
                            </div>
                          </div>
                          <div>
                            <Label>Current Version</Label>
                            <div className="mt-1">v{selectedTheme.version}</div>
                          </div>
                          <div>
                            <Label>Created At</Label>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {new Date(selectedTheme.created_at).toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <Label>Last Updated</Label>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {new Date(selectedTheme.updated_at).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Description</h3>
                        <p className="text-muted-foreground">
                          {selectedTheme.description || 'No description provided'}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Validation</h3>
                        {selectedTheme.validation_status.is_valid ? (
                          <div className="flex items-center gap-2 text-green-500">
                            <Check className="w-4 h-4" />
                            <span>Theme configuration is valid</span>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2 text-destructive mb-2">
                              <Info className="w-4 h-4" />
                              <span>Theme has validation issues</span>
                            </div>
                            <div className="space-y-2">
                              {selectedTheme.validation_status.messages.map((msg, index) => (
                                <div 
                                  key={index} 
                                  className={`p-2 rounded-md text-sm ${
                                    msg.type === 'error' 
                                      ? 'bg-destructive/10 text-destructive' 
                                      : 'bg-yellow-500/10 text-yellow-500'
                                  }`}
                                >
                                  {msg.message}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="versions">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Version History</h3>
                        <Dialog open={showVersionDialog} onOpenChange={setShowVersionDialog}>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2">
                              <History className="w-4 h-4" />
                              Apply Version
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Apply Theme Version</DialogTitle>
                              <DialogDescription>
                                Select a version to apply to the theme. This will update the active configuration.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <Label>Select Version</Label>
                              <div className="mt-2 space-y-2">
                                {versions.map((version) => (
                                  <div 
                                    key={version.id} 
                                    className={`p-3 rounded-md border cursor-pointer ${
                                      selectedVersion === version.version
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border hover:border-primary/50'
                                    }`}
                                    onClick={() => setSelectedVersion(version.version)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">Version {version.version}</span>
                                      {version.is_active && (
                                        <Badge variant="outline">Current</Badge>
                                      )}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                      {new Date(version.created_at).toLocaleString()}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setShowVersionDialog(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleApplyVersion}>
                                Apply Selected Version
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <Table>
                        <TableCaption>History of theme versions</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Version</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {versions.map((version) => (
                            <TableRow key={version.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  {version.version}
                                  {version.is_active && (
                                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                      Active
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>{getStatusBadge(version.status)}</TableCell>
                              <TableCell>
                                {new Date(version.created_at).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>{version.created_by ? 'Admin' : 'System'}</span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  disabled={version.is_active}
                                  onClick={() => {
                                    setSelectedVersion(version.version);
                                    setShowVersionDialog(true);
                                  }}
                                >
                                  Apply
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}

                          {versions.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                <Clock className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                <p>No version history available</p>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="audit">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Audit Log</h3>

                      <Table>
                        <TableCaption>History of theme changes</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Action</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Details</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {auditLogs.map((log) => (
                            <TableRow key={log.id}>
                              <TableCell className="font-medium capitalize">
                                {log.action}
                              </TableCell>
                              <TableCell className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>{log.user_id ? 'Admin' : 'System'}</span>
                              </TableCell>
                              <TableCell>
                                {new Date(log.created_at).toLocaleString()}
                              </TableCell>
                              <TableCell>
                                {log.action === 'update' ? (
                                  <span>
                                    Version {log.previous_state?.version} → {log.new_state?.version}
                                  </span>
                                ) : (
                                  <span>
                                    {log.action === 'create' ? 'Initial version created' : ''}
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}

                          {auditLogs.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                <Clock className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                <p>No audit logs available</p>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <div className="flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="border-destructive/30 text-destructive gap-2">
                        <Trash className="w-4 h-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the theme
                          and all its versions from the database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => handleDeleteTheme(selectedTheme.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Dialog open={showCloneDialog} onOpenChange={setShowCloneDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Copy className="w-4 h-4" />
                        Clone
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Clone Theme</DialogTitle>
                        <DialogDescription>
                          Create a copy of this theme with a new name. The clone will be a draft version.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Label htmlFor="clone-name">New Theme Name</Label>
                        <Input
                          id="clone-name"
                          value={cloneName}
                          onChange={(e) => setCloneName(e.target.value)}
                          placeholder={`Copy of ${selectedTheme.name}`}
                          className="mt-2"
                        />
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCloneDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCloneTheme}>
                          Clone Theme
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </div>

                <div className="flex gap-2">
                  {!selectedTheme.is_default && (
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => handleSetDefault(selectedTheme.id)}
                    >
                      <Star className="w-4 h-4" />
                      Set as Default
                    </Button>
                  )}
                </div>
              </CardFooter>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <FileBox className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-medium mb-2">No Theme Selected</h3>
              <p>Select a theme from the list to view and manage its details</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ThemeManager;
