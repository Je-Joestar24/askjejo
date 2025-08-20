<template>

    <div class="profile-card">
        <!-- Profile Header -->
        <div class="profile-header">
            <div class="avatar-section">
                <div class="avatar-circle">
                    <svg class="user-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>
            </div>

            <div class="profile-actions">
                <button @click.prevent="" class="edit-btn" :class="{ 'active': false }"
                    :aria-label="false ? 'Cancel editing' : 'Edit profile'">
                    <svg v-if="!false" class="edit-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                    <svg v-else class="close-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                    {{ false ? 'Cancel' : 'Edit' }}
                </button>
            </div>
        </div>

        <form @submit.prevent="" class="profile-form">
            <div class="form-group">
                <label for="username" class="form-label">Username</label>
                <input id="username" type="text" class="form-input" :disabled="!false" :class="{ 'editing': false }"
                    aria-describedby="username-help" />
                <div id="username-help" class="form-help">Your display name</div>
            </div>
            <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input id="email" type="email" class="form-input" :disabled="!false" :class="{ 'editing': false }"
                    aria-describedby="email-help" />
                <div id="email-help" class="form-help">Your email address</div>
            </div>
            <!-- Change Password Section -->
            <div class="password-section" v-show="false">
                <button @click="" type="button" class="change-password-btn" :class="{ 'active': false }"
                    aria-label="Change password">
                    <svg class="lock-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10z" />
                    </svg>
                    {{ false ? 'Cancel Password Change' : 'Change Password' }}
                </button>

                <!-- Password Change Form -->
                <div v-if="false" class="password-form">
                    <div class="form-group">
                        <label for="currentPassword" class="form-label">Current Password</label>
                        <input id="currentPassword" type="password" class="form-input"
                            placeholder="Enter current password" aria-describedby="current-password-help" />
                        <div id="current-password-help" class="form-help">Enter your current password</div>
                    </div>

                    <div class="form-group">
                        <label for="newPassword" class="form-label">New Password</label>
                        <input id="newPassword" type="password" class="form-input" placeholder="Enter new password"
                            aria-describedby="new-password-help" />
                        <div id="new-password-help" class="form-help">Enter your new password</div>
                    </div>
                </div>
            </div>
            <div class="form-actions" v-if="false">
                <button type="button" @click="" class="btn btn-secondary" aria-label="Cancel changes">
                    Cancel
                </button>
                <button type="submit" class="btn btn-primary" :disabled="!false" aria-label="Save profile changes">
                    <svg class="save-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
                    </svg>
                    Save Changes
                </button>
            </div>
        </form>
    </div>
</template>