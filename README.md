Имеется:
Свёрстанная таблица с двумя шагами, подключена валидация полей. Php файлы эмулируют работу API. Приложено видео с конечным вариантом выполненного тестового задания.

Задание: - исправить стили, добавить адаптивность полей - добавить валидацию на соответствие поля password2 к password - добавить функционал переключения шагов - добавить валидацию полей при переключении шагов и перед отправкой формы - при вводе данных в поле zip отправить запрос на geoStatus.php, если зип доступен - отправить данные на geoData.php, полученный ответ распарсить в поля state и city, если зип заблокирован - вывести alert и очистить поля (API принимает POST запрос в текстовом формате с ключом zip, все зипы до 33333 - валидные)

Примечания: - совместимость с IE 11 - использовать имеющийся функционал

Фид-бэк

1) Форма работает - +
2) в src есть лишние ассеты - +
3) как в css прописал input лучше такого воздерживаться т.к. это базовый компонент и может изменить стили там где не ожидаешь - +
4) по медиа запросам, переход от флекс к display inline-block не самое удачное решение, лучше воспользоваться свойствами flex. - +
   
5) По js нельзя было изменять базовый метод ajax, т.к. он был универсальным а стал заточеным под эту задачу, и далее с таким кодом будет очень сложно работать. - +
6) allowed, insertData вызов фунций до их объявления - +
     
6) по валидации правильно вставил password2, но только по примеру password а его тут же можно было расширить валидацией equal, а не выносить ее отдельно  - +

7) зачем pass1 и pass2 объявлять за пределами функции если они больше нигде не используются? checkPasswordsMatch будет вызываться абсолютно для каждого элемента формы его вызов нужно было поместить в массив validations.password2, - +
8) это условие не верное element.id === 'password2' && element.id === 'password' т.к. один и тот же элемент не может быть иметь разные значения одновременно, и в самой функции мы перезаписываем параметр result это можно отнести к сайдэффектам - + 
9) Если чуть изменить верстку, то это уже сломается,
var changeActiveStep = this.parentNode.parentNode.children[0].children;
    var openHiddenBtn = this.parentNode.children  - + 

10) В данном случае надежнее привязать к классу элемента, структуру сложнее отследить
Array.from(
      document.querySelectorAll('[data-validation]')
    ).slice(0, -1) вычисление валидируемых полей происходит с вычитанием одного из них, в данной ситуации нужно представить что у нас добавились поля например, или мы добавили динамические поля, этот кусок прийдется переписать. - +
    
11) validateField в одном месте вызывается дважды хотя можно вызвать ее один раз и вывести результат 

12) добавили счетчик чтобы считать валидные поля, а если от обратного мы можем проверять что нет ни одного поля с ошибкой и счетчик не нужен тогда.

changeActiveStepBack[1].classList.remove('step_active');
    changeActiveStepBack[0].classList.add('step_active');
    это будет не расширяемый кусок если нам нужно будет добавить еще шаги
    requestZip, allowed уже писал выше, не правильное пользование базовым методом ajax
    submitFormFunc также прийдется переписать при любом расширении задания