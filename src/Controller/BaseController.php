<?php
// src/Controller/LuckyController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BaseController extends AbstractController
{
    /**
     * @Route("/")
     */
    public function liveSearchInputAction(): Response
    {
        return $this->render('live-search-input-example.html.twig', array(
            'props'=>array(
                'habitissimoApiBaseUrl'=>$_ENV['API_BASE_URL_ES'],//The "ES" should come from a locale of the user
                'liveSearchInputPlaceHolder'=>'Qué necesitas...',//This should come from a translations system
                'liveSearchLabelContent'=>'Encuentra profesionales de confianza'//This should come from a translations system
            ),
        ));
    }
}