/**
 * Common functionality for all pages
 */

const Common = {
    init() {
        this.checkAuth();
        this.renderSidebar();
        this.renderTopbar();
        this.bindEvents();
    },

    checkAuth() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('smart_attendance_system/');

        if (!user && !isLoginPage) {
            window.location.href = 'index.html';
        } else if (user && isLoginPage) {
            this.redirectToDashboard(user.role);
        }
        this.currentUser = user;
    },

    redirectToDashboard(role) {
        window.location.href = `${role}_dashboard.html`;
    },

    renderSidebar() {
        const sidebarContainer = document.getElementById('sidebar-container');
        if (!sidebarContainer || !this.currentUser) return;

        const role = this.currentUser.role;
        const navs = {
            student: [
                { url: 'student_dashboard.html', icon: 'fa-home', label: 'Dashboard' },
                { url: 'profile.html', icon: 'fa-user', label: 'My Profile' },
                { url: 'student_scanner.html', icon: 'fa-qrcode', label: 'Attendance Scan' }
            ],
            staff: [
                { url: 'staff_dashboard.html', icon: 'fa-home', label: 'Dashboard' },
                { url: 'profile.html', icon: 'fa-user', label: 'My Profile' },
                { url: 'staff_attendance.html', icon: 'fa-edit', label: 'Mark Attendance' }
            ],
            hod: [
                { url: 'hod_dashboard.html', icon: 'fa-home', label: 'Dashboard' },
                { url: 'profile.html', icon: 'fa-user', label: 'My Profile' }
            ],
            admin: [
                { url: 'admin_dashboard.html', icon: 'fa-home', label: 'Dashboard' },
                { url: 'admin_management.html', icon: 'fa-users', label: 'Manage Users' },
                { url: 'profile.html', icon: 'fa-user', label: 'My Profile' }
            ]
        };

        const currentPath = window.location.pathname.split('/').pop();

        sidebarContainer.innerHTML = `
            <aside class="sidebar">
                <div class="sidebar-header">
                    <div class="logo">
                        <i class="fas fa-user-check"></i>
                        <span>SmartAttend</span>
                    </div>
                </div>
                <nav class="nav-links">
                    ${navs[role].map(item => `
                        <li class="nav-item">
                            <a href="${item.url}" class="nav-link ${currentPath === item.url ? 'active' : ''}">
                                <i class="fas ${item.icon}"></i>
                                <span>${item.label}</span>
                            </a>
                        </li>
                    `).join('')}
                    <li class="nav-item" style="margin-top: auto;">
                        <a href="#" class="nav-link" id="logout-btn">
                            <i class="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </nav>
            </aside>
        `;
    },

    renderTopbar() {
        const topbarContainer = document.getElementById('topbar-container');
        if (!topbarContainer || !this.currentUser) return;

        const title = document.title.replace('Smart Attendance - ', '');

        topbarContainer.innerHTML = `
            <header class="topbar">
                <div class="topbar-left">
                    <h3 id="view-title">${title}</h3>
                </div>
                <div class="topbar-right">
                    <div class="user-profile">
                        <span class="user-name">${this.currentUser.name}</span>
                        <div class="user-avatar" style="width: 40px; height: 40px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-user"></i>
                        </div>
                    </div>
                </div>
            </header>
        `;
    },

    bindEvents() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => Common.init());
