

class TimerTask {
    tasks: Map<string, NodeJS.Timer>;

    constructor() {
        this.tasks = new Map<string, NodeJS.Timer>();
    }

    addInterval(taskName: string, task: () => any, interval: number) {
        if(this.tasks.has(taskName)) {
            console.log(`task ${taskName} already defined. clear task`);
            clearInterval(this.tasks.get(taskName));
        }
        const timer = setInterval(task, interval);
        this.tasks.set(taskName, timer);
    }

    clearAll() {
        console.log(`clear all tasks`);
        this.tasks.forEach((timerId, taskName) => {
            console.log(`clearInterval(${taskName})`);
            clearInterval(timerId);
        });
        this.tasks = new Map<string, NodeJS.Timer>();

    } 
};

export const timerTask = new TimerTask();