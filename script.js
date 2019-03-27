var app = new Vue({
    el:"#app",
    data:{
        playerHealth : 100,
        monsterHealth : 100,
        isGameRunning : false,
        turns : [],

    },
    methods:{
        startGame:function(){
            this.isGameRunning = true;
            this.monsterHealth = 100 ;
            this.playerHealth = 100;
        },
        attack:function(){
            this.attackMonster(2,8);
            if(this.checkWin()){
                return;
            }
            this.attackPlayer();
            this.checkWin();
        },
        specialAttack:function(){
            this.attackMonster(5,10);
            if(this.checkWin()){
                return;
            }
            this.attackPlayer();
            this.checkWin();
        },
        heal:function(){
            if(this.playerHealth > 100 ){
                alert("You have enough health")
                return;
          
            }else{
               this.healPlayer();
                this.attackPlayer()
                this.checkWin();
                if(this.playerHealth > 100){
                    alert("You have enough health!")
                    this.playerHealth = original_health
                }
              
            }

        },
        giveUp:function(){
            if(confirm("Do you want to quit/giveup?")){
                this.monsterHealth=100;
                this.playerHealth=100;
                this.isGameRunning = false
                this.turns = []
                return
            }

        },
        attackMonster:function(min, max){
            var damage = this.calculateDamage(min,max)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text : "Player hits monster for " + damage
            });
        },
        attackPlayer:function(){
            damage = this.calculateDamage(5,15)
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text : "Monster hits player for " + damage
            });
        },
        calculateDamage:function(min, max){
            return Math.max(Math.floor(Math.random()*max) + 1, min)
            
        },
        healPlayer:function(){
            this.playerHealth += 10
        },
        calculateHeal:function(min, max){
            return Math.max(Math.floor(Math.random()*max) + 1, min)
        },
        checkWin:function(){
           if (this.monsterHealth <=0){
               if(confirm("You Won !! New Game ? ")){
                   this.startGame();
                   return true;
               }else{
                   this.isGameRunning = false;
                   this.playerHealth =100;
                   this.monsterHealth =100;
               }

           }else if (this.playerHealth <= 0 ){
          
            if(confirm("You Lost !! New Game ? ")){
                this.startGame();
                return true;
            }else{
                this.isGameRunning = false;
                this.playerHealth =100;
                this.monsterHealth =100;
            }
    
           }
        }
    },

});