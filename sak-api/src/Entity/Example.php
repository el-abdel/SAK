<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ExampleRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *     attributes={"security"="is_granted('ROLE_API')"}
 * )
 * @ORM\Entity(repositoryClass=ExampleRepository::class)
 */
class Example
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $field_one;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $field_two;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFieldOne(): ?string
    {
        return $this->field_one;
    }

    public function setFieldOne(?string $field_one): self
    {
        $this->field_one = $field_one;

        return $this;
    }

    public function getFieldTwo(): ?string
    {
        return $this->field_two;
    }

    public function setFieldTwo(?string $field_two): self
    {
        $this->field_two = $field_two;

        return $this;
    }
}
