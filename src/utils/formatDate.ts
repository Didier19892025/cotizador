   export const formatDate = (date: Date) => {
        return new Date(date).toLocaleString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }


    export const time = (loginTime: Date, logoutTime: Date) => {
        const diffTime = Math.abs(logoutTime.getTime() - loginTime.getTime());
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        return diffHours;
    }