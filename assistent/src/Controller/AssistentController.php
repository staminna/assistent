<?php

/**
 * @file
 * Contains \Drupal\assistent\Controller\HelloController.
 */

namespace Drupal\assistent\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class AssistentController extends ControllerBase {

  function assistent_get_apikey() {

    $obj = new \stdClass();
    $obj->label="API Keys for the assistent";
    $obj->data = array(
        array('flickr','709b2efe5983f428a9a6477cb253efba&'),
        //and so on...
    );
    return new JsonResponse($obj);
  }

  public function content() {

    // Start building the content.
    $build = array();
    // Main container DIV. We give it a unique ID so that the JavaScript can
    // find it using jQuery.
    $build['content'] = array(
      '#markup' => '<div id="results"> </div> <gcse:searchresults-only></gcse:searchresults-only>
                    <div id="images"></div>',
    );



    // Attach library containing css and js files.
    // Add our script. It is tiny, but this demonstrates how to add it. We pass
    // our module name followed by the internal library name declared in
    // libraries yml file.
    $build['#attached']['library'][] = 'assistent/annyang';
    $build['#attached']['library'][] = 'assistent/speechkitt';
    $build['#attached']['library'][] = 'assistent/assistent';
    $build['#attached']['library'][] = 'assistent/twig';
    $build['#attached']['library'][] = 'assistent/assistent_stylesheet';
    $build['#attached']['library'][] = 'assistent/google_customsearch';
    $build['#attached']['library'][] = 'assistent/googlecal';
    $build['#attached']['library'][] = 'assistent/angular';
    return $build;
  }
}


?>
