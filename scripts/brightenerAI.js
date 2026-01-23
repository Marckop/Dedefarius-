// Функция-конструктор для нашего ИИ
const brightenerAI = () => {
    return extend(FlyingAI, {
        updateMovement() {
            // ВАЖНО: проверяем дистанцию до цели
            if (this.target != null && this.unit.within(this.target, 140)) {
                let time = Time.time / 20;
                let angle = this.unit.angleTo(this.target);
                
                // Тот самый танец! ∩^ω^∩
                let vec = Tmp.v1.trns(angle + 90, Mathf.sin(time, 2, 50), Mathf.cos(time, 3, 30));
                this.unit.moveAt(vec);
                this.unit.lookAt(this.target);
            } else {
                this.super$updateMovement();
            }
        }
    });
};

// Ждем загрузки, чтобы точно найти юнита по имени
Events.on(ClientLoadEvent, () => {
    // ВНИМАНИЕ: добавил префикс мода 'dedefarius-'
    const unitType = UnitTypes.get("dedefarius-01s-03-brightener");

    if (unitType != null) {
        unitType.aiController = brightenerAI;
        Log.info("--- [DEDEFARIUS] ИИ для Брайтнера успешно загружен! (˶ᵔ ᵕ ᵔ˶) ---");
    } else {
        Log.err("--- [DEDEFARIUS] Юнит не найден! Проверь имя в UnitTypes.get ---");
    }
});
