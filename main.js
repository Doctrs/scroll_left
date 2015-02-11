/**
 * Author: DOC_tr
 * Site: http://phpbl.ru
 */

$(document).ready(function(){
    // определяем константы
    var el = $('#scroll');
    var max_down = $('#footer').outerHeight(true);

    var doc = $(document);
    var win = $(window);
    var el_top = el.offset().top;
    var main_position = {
        'position': el.css('position'),
        'top': el.css('top'),
        'left': el.css('left')
    }
    // задаем начальное позиционированние элементу
    el.css({
        'position': 'absolute',
        'top': el_top + 'px',
        'left': el.offset().left + 'px'
    });
    // только в случае если высота документа больше чем высота левой колонки
    if(doc.height() - max_down > el_top + el.height()) {
        // для определения в какую сторону был скролл
        var up_down = 0;
        // вешаем событие на скролл
        $(window).scroll(function () {
            // если проскроллили до элемента
            if (doc.scrollTop() >= el_top) {
                // скролл вниз
                if (is_down()) {
                    // если нижняя граница элемента выше чем нижняя граница экрана
                    if (el.offset().top + el.height() < doc.scrollTop() + win.height()) {
                        // определяем высоту ниже которой нельзя опускать
                        var max_top = doc.height() - max_down - el.height();
                        // если элемент меньше экрана пользвоателя
                        // то просто привязываем его к верху страницы
                        if (win.height() > el.height()) {
                            var top = doc.scrollTop();
                        } else {
                            var top = doc.scrollTop() - (el.height() - win.height());
                        }
                        // если высота ниже максимальной
                        if (top > max_top) {
                            top = max_top;
                        }
                        el.css({
                            'position': 'absolute',
                            'bottom': '',
                            'top': top + 'px'
                        });
                    }
                } else {
                    // если высота проскролености меньше верха элементка
                    if (doc.scrollTop() < el.offset().top) {
                        el.css({
                            'position': 'absolute',
                            'bottom': '',
                            'top': doc.scrollTop() + 'px'
                        });
                    }
                }
            } else {
                // если до верха элемента недоскролили
                el.css({
                    'position': 'absolute',
                    'top': el_top + 'px'
                });
            }
        });
        // определяем вниз ли был скролл
        function is_down() {
            var is_up = doc.scrollTop() > up_down;
            up_down = doc.scrollTop();
            return is_up;
        }
    } else {
        // если высота документа меньше левой колонки то присваиваем ему старый css
        el.css(main_position);
    }
});
