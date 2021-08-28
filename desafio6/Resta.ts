class Resta {

    constructor(private num1: number, private num2: number) {
        this.num1 = num1;
        this.num2 = num2;
    }

    resultado () { return (this.num1 - this.num2) };
}
export default Resta;