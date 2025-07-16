export const saveData = (accessToken: string, user: string) => {
    localStorage.setItem('inst_accessToken', accessToken);
    localStorage.setItem('inst_user', user);
}