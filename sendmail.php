<?php

// // Файлы phpmailer
// require 'PHPMailer/src/PHPMailer.php';
// require 'PHPMailer/src/SMTP.php';
// require 'PHPMailer/src/Exception.php';

// # проверка, что ошибки нет
// if (!error_get_last()) {

//     // Переменные, которые отправляет пользователь
//     $name = $_POST['name'] ;
//     $email = $_POST['email'];
//     $message = $_POST['text'];
//     $phone = $_POST['phone'];
    
    
//     // Формирование самого письма
//     $title = "Заголовок письма";
//     $body = "
//     <h2>Новое письмо</h2>
//     <b>Имя:</b> $name<br>
//     <b>Почта:</b> $email<br>
//     <b>Телефон:</b> $phone<br><br>
//     <b>Сообщение:</b><br>$message
//     ";
    
//     // Настройки PHPMailer
//     $mail = new PHPMailer\PHPMailer\PHPMailer();
    
//     $mail->isSMTP();   
//     $mail->CharSet = "UTF-8";
//     $mail->SMTPAuth   = true;
//     //$mail->SMTPDebug = 2;
//     $mail->Debugoutput = function($str, $level) {$GLOBALS['data']['debug'][] = $str;};
    
//     // Настройки вашей почты
//     $mail->Host       = 'smtp.spaceweb.ru'; // SMTP сервера вашей почты
//     $mail->Username   = 'info@korzina-konditsioner.ru'; // Логин на почте
//     $mail->Password   = '*********'; // Пароль на почте
//     $mail->SMTPSecure = 'ssl';
//     $mail->Port       = 465;
//     $mail->setFrom('info@korzina-konditsioner.ru', 'Name'); // Адрес самой почты и имя отправителя
    
//     // Получатель письма
//     $mail->addAddress('info@korzina-konditsioner.ru');  
//     // $mail->addAddress('poluchatel2@gmail.com'); // Ещё один, если нужен
    
    
//     // Отправка сообщения
//     $mail->isHTML(true);
//     $mail->Subject = $title;
//     $mail->Body = $body;    
    
//     // Проверяем отправленность сообщения
//     if ($mail->send()) {
//         $data['result'] = "success";
//         $data['info'] = "Сообщение успешно отправлено!";
//     } else {
//         $data['result'] = "error";
//         $data['info'] = "Сообщение не было отправлено. Ошибка при отправке письма";
//         $data['desc'] = "Причина ошибки: {$mail->ErrorInfo}";
//     }
    
// } else {
//     $data['result'] = "error";
//     $data['info'] = "В коде присутствует ошибка";
//     $data['desc'] = error_get_last();
// }

// // Отправка результата
// header('Content-Type: application/json');
// echo json_encode($data);


    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";

    $mail = new PHPMailer(true); /* Создаем объект MAIL */
    $mail->CharSet = "UTF-8"; /* Задаем кодировку UTF-8 */
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true); /* Разрешаем работу с HTML */

    
$mail->addAddress("info@korzina-konditsioner.ru"); /* Здесь введите Email, куда отправлять */
//от кого письмо
$mail->setFrom("info@korzina-konditsioner.ru");
//тема письма
$mail->Subject = "Заявка с формы"; /* Тема письма */
// $mail->MsgHTML($body);


//тело письма
$body = '<h1>Письмо с сайта</h1>';

if(trim(!empty($_POST['name']))){
$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
        }
        if(trim(!empty($_POST['phone']))){
            $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
            }

   $mail->Body = $body;

   //отправляем

   if(!$mail->send()){
    $message = 'Ошибка';
   }else{
    $message = 'Данные отправлены';
   }

   $response = ['message' => $message];
   header ('Content-type: application/json');
   echo json_encode($response);


?>
