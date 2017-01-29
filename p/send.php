<?php

if (isset($_GET['nameOrder']) AND isset($_GET['phoneOrder'])) {

    $subject = "Заказ газона с подарком - GazonPrimula";
    $nameOrder = htmlspecialchars(trim($_GET['nameOrder']));
    $phoneOrder = htmlspecialchars(trim($_GET['phoneOrder']));
    $sendmessage = "<html><body>";
    $sendmessage .= "<p><b>Имя:</b> " . $nameOrder . "</p>";
    $sendmessage .= "<p><b>Контактный телефон:</b> " . $phoneOrder . "</p>";
    $sendmessage .= "</body></html>";
    $sendmessage = preg_replace('/\?/si', '&#063;', $sendmessage);
}

if (isset($_GET['nameOrderItem']) AND isset($_GET['phoneOrderItem']) AND isset($_GET['nameItem'])) {

    $subject = "Запрос стоимости газона - GazonPrimula";
    $nameItem = htmlspecialchars(trim($_GET['nameItem']));
    $nameOrderItem = htmlspecialchars(trim($_GET['nameOrderItem']));
    $phoneOrderItem = htmlspecialchars(trim($_GET['phoneOrderItem']));

    $sendmessage = "<html><body>";
    $sendmessage .= "<p><b>Газон:</b> " . $nameItem . "</p>";
    $sendmessage .= "<p><b>Имя:</b> " . $nameOrderItem . "</p>";
    $sendmessage .= "<p><b>Контактный телефон:</b> " . $phoneOrderItem . "</p>";
    $sendmessage .= "</body></html>";
    $sendmessage = preg_replace('/\?/si', '&#063;', $sendmessage);
}



$mailto = "mira-gazon@i.ua";
$charset = "UTF-8";
$content = "text/html;";
$status = "<br>";


/* head */
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: " . $content . " charset=" . $charset . "\r\n";

if (isset($_GET['nameOrder']) AND isset($_GET['phoneOrder'])) {
    $headers .= "From: \"" . $nameOrder . "\" <mira-gazon@i.ua>\r\n";
} else {
    $headers .= "From: \"" . $nameOrderItem . "\" <mira-gazon@i.ua>\r\n";
}


$headers .= "Date: \"" . date("Y-m-d (H:i:s)", \time()) . "\r\n";
$headers .= "Bcc: mira-gazon@i.ua\r\n";      // кому слать копию
$headers .= "X-Mailer: E-mail from my super-site \r\n";

//echo $nameOrderItem;

$mail = mail($mailto, $subject, $sendmessage, $headers);

if ($mail) {
    echo 'Ваша заявка успешно отправилась!<br>Наши менежеры скоро с вами свяжутся';
} else {
    echo 'Что-то пошло не так....сообщение не отправлено';
}

$tel = isset($phoneOrder) ? substr( preg_replace("/(\D)/", "", $phoneOrder), -10 ) : substr( preg_replace("/(\D)/", "", $phoneOrderItem), -10 );
$name = isset($nameOrder) ? $nameOrder : $nameOrderItem.'. Газон: '.$nameItem;
$set['request']['contacts']['add'][] = array(
    'name' => $name,
    'custom_fields' => array(
        array(
            'id' => 1255322,
            'values' => array(
                array(
                    'value' => '8' . $tel,
                    'enum' => 'MOB'
                )
            ),
        ),
        array(
            'id'=>1711823,
            'values'=>array(
                array(
                    'value' => 'mira-gazon.com',
                )
            )
        ),
        array(
            'id'=>1740801, #Тип контакта 
            'values'=>array(
                array(
                    'value'=>4056905
                )
            )
        ),
        array(
            'id'=>1754116, #Форма заявки
            'values'=>array(
                array(
                    'value'=>$_POST['form']
                )
            )
        ),
        array(
            'id'=>1754114, #Сайт источник
            'values'=>array(
                array(
                    'value'=>htmlspecialchars(trim($_COOKIE["ref"]))
                )
            )
        ),
        array(
            'id'=>1712073, #Ключевое слово
            'values'=>array(
                array(
                    'value'=>rawurldecode(trim($_COOKIE["term"])).' '.rawurldecode(trim($_COOKIE["reftext"]))
                )
            )
        ),
        array(
            'id'=>1754118, #UTM_medium
            'values'=>array(
                array(
                    'value'=>htmlspecialchars(trim($_COOKIE["medium"]))
                )
            )
        ),
        array(
            'id'=>1754120, #UTM_source
            'values'=>array(
                array(
                    'value'=>htmlspecialchars(trim($_COOKIE["source"]))
                )
            )
        ),
        array(
            'id'=>1754122, #UTM_campaign
            'values'=>array(
                array(
                    'value'=>htmlspecialchars(trim($_COOKIE["campaign"]))
                )
            )
        ),
    ),
);

Auth();
if( tSearch($tel) ) AddContact($set);

function Auth(){
    $user=array(
        'USER_LOGIN'=>'nikita3008@yandex.ru', #Ваш логин (электронная почта)
        'USER_HASH'=>'7755bf78deac103c321321f4c1b17106' #Хэш для доступа к API (смотрите в профиле пользователя)
    );
    $link='https://new543ce3da0e15a.amocrm.ru/private/api/auth.php?type=json';
    $curl=curl_init(); 
    curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
    curl_setopt($curl,CURLOPT_URL,$link);
    curl_setopt($curl,CURLOPT_POST,true);
    curl_setopt($curl,CURLOPT_POSTFIELDS,http_build_query($user));
    curl_setopt($curl,CURLOPT_HEADER,false);
    curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
    curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
    curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
    curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
    $out=curl_exec($curl);
    curl_close($curl); 
    return json_decode($out,true);
}

function tSearch($tel) {
    $phone = array(
        'query' => $tel
    );
    $link='https://new543ce3da0e15a.amocrm.ru/private/api/v2/json/contacts/list?'.http_build_query($phone);
    $curl=curl_init(); 
    curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
    curl_setopt($curl,CURLOPT_URL,$link);
    curl_setopt($curl,CURLOPT_HEADER,false);
    curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt');
    curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt');
    curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
    curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
    $out=curl_exec($curl);
    curl_close($curl);
    $Response=json_decode($out,true);
    if($Response) {
        return false;
    } else {
        return true;
    }
}

function AddContact($set){
    $link='https://new543ce3da0e15a.amocrm.ru/private/api/v2/json/contacts/set';
    $curl=curl_init();
    curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
    curl_setopt($curl,CURLOPT_URL,$link);
    curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
    curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($set));
    curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
    curl_setopt($curl,CURLOPT_HEADER,false);
    curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
    curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
    curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
    curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
    $out=curl_exec($curl);
    curl_close($curl);
    return json_decode($out,true);
}

?>