import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workspaceService, workspaceKeys } from '../../../services/workspace';

const WorkspaceMembersPage = () => {
  const { workspaceId } = useParams();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('members');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('');

  // Fetch Members
  const { data: membersResult, isLoading: loadingMembers } = useQuery({
    queryKey: workspaceKeys.members(workspaceId),
    queryFn: () => workspaceService.getMembers(workspaceId)
  });

  // Fetch Invitations
  const { data: invitationsResult, isLoading: loadingInvitations } = useQuery({
    queryKey: workspaceKeys.invitations(workspaceId),
    queryFn: () => workspaceService.getInvitations(workspaceId)
  });

  // Fetch Roles
  const { data: roles, isLoading: loadingRoles } = useQuery({
    queryKey: workspaceKeys.roles(),
    queryFn: () => workspaceService.getRoles(workspaceId)
  });

  const members = membersResult?.data || [];
  const invitations = invitationsResult?.data || [];

  // Summary Metrics
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'ACTIVE').length;
  const pendingInvitations = invitations.filter(i => i.status === 'PENDING').length;
  
  // Role Distribution
  const roleDistribution = members.reduce((acc, member) => {
    const roleName = member.role?.name || 'Unknown';
    acc[roleName] = (acc[roleName] || 0) + 1;
    return acc;
  }, {});

  // Mutations
  const inviteMutation = useMutation({
    mutationFn: (data) => workspaceService.inviteMember(workspaceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(workspaceKeys.invitations(workspaceId));
      setInviteModalOpen(false);
      setInviteEmail('');
    }
  });

  const revokeMutation = useMutation({
    mutationFn: (invitationId) => workspaceService.revokeInvitation(workspaceId, invitationId),
    onSuccess: () => queryClient.invalidateQueries(workspaceKeys.invitations(workspaceId))
  });

  const changeRoleMutation = useMutation({
    mutationFn: ({ memberId, roleId }) => workspaceService.changeMemberRole(workspaceId, memberId, roleId),
    onSuccess: () => queryClient.invalidateQueries(workspaceKeys.members(workspaceId))
  });

  const removeMemberMutation = useMutation({
    mutationFn: (memberId) => workspaceService.removeMember(workspaceId, memberId),
    onSuccess: () => queryClient.invalidateQueries(workspaceKeys.members(workspaceId))
  });

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail || !inviteRole) return;
    inviteMutation.mutate({ email: inviteEmail, roleId: inviteRole });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">People</h1>
          <p className="text-sm text-slate-500">Manage who has access to this workspace</p>
        </div>
        <button 
          onClick={() => setInviteModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Invite member
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <div className="text-sm text-slate-500 mb-1">Total Members</div>
          <div className="text-2xl font-semibold text-slate-900">{totalMembers}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <div className="text-sm text-slate-500 mb-1">Active Members</div>
          <div className="text-2xl font-semibold text-slate-900">{activeMembers}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <div className="text-sm text-slate-500 mb-1">Pending Invitations</div>
          <div className="text-2xl font-semibold text-slate-900">{pendingInvitations}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <div className="text-sm text-slate-500 mb-1">Roles</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {Object.entries(roleDistribution).map(([role, count]) => (
              <span key={role} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                {role}: {count}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('members')}
            className={`${activeTab === 'members' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Members
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`${activeTab === 'pending' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            Pending invitations
            {pendingInvitations > 0 && (
              <span className="ml-2 bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs">
                {pendingInvitations}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        {activeTab === 'members' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Member</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Joined</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {loadingMembers ? (
                  <tr><td colSpan="5" className="px-6 py-4 text-center text-sm text-slate-500">Loading...</td></tr>
                ) : members.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-4 text-center text-sm text-slate-500">No members found</td></tr>
                ) : members.map((member) => (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                          {member.user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{member.user?.name}</div>
                          <div className="text-sm text-slate-500">{member.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select 
                        value={member.roleId}
                        onChange={(e) => changeRoleMutation.mutate({ memberId: member.id, roleId: e.target.value })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        {roles?.map(r => (
                          <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => removeMemberMutation.mutate(member.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'pending' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Invited By</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {loadingInvitations ? (
                  <tr><td colSpan="5" className="px-6 py-4 text-center text-sm text-slate-500">Loading...</td></tr>
                ) : pendingInvitations === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-4 text-center text-sm text-slate-500">No pending invitations</td></tr>
                ) : invitations.map((inv) => (
                  <tr key={inv.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{inv.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {inv.role?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {inv.inviter?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {inv.status === 'PENDING' && (
                        <button 
                          onClick={() => revokeMutation.mutate(inv.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {inviteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setInviteModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleInvite}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-slate-900" id="modal-title">Invite a member</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                      <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        placeholder="ahmad@example.com" 
                        required 
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-slate-700">Role</label>
                      <select 
                        id="role" 
                        name="role" 
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        required
                      >
                        <option value="">Select a role</option>
                        {roles?.map(r => (
                          <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" disabled={inviteMutation.isPending} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {inviteMutation.isPending ? 'Sending...' : 'Send invitation'}
                  </button>
                  <button type="button" onClick={() => setInviteModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceMembersPage;
