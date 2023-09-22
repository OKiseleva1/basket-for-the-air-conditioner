<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";

    $mail = new PHPMailer(true);	
    $mail->CharSet = "UTF-8";
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    
$mail->addAddress("info@korzina-konditsioner.ru"); /* Здесь введите Email, куда отправлять */
$mail->setFrom($email);
$mail->Subject = "[Заявка с формы]"; /* Тема письма */
$mail->MsgHTML($body);


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