function NumberOf1Between1AndN_Solution(n)
{
    // write code here
    if(n<1){
        return 0;
    }
    let dight = 0; // 位数
    let num = n;
    while(num>1){
        num = num/10;
        dight++;
    }
    if(dight<2){
        return 1;
    }
    let thisDight = 2;
    let count = 1;
    while(thisDight<=dight-1){
        count = count*10+Math.pow(10,thisDight-1);
        thisDight++;
    }
    let mid = Math.pow(10,thisDight-1)
    if(n >= 2*mid){
        count = count*2 + mid;
        
    }
    
}